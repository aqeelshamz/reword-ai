import joi from "joi";
import dotenv from "dotenv";
import crypto from "crypto";
import stripe from "stripe";
import express from "express";
import Razorpay from "razorpay";
import User from "../models/User.js";
import Item from "../models/Item.js";
import Order from "../models/Order.js";
import Rewrites from "../models/Rewrites.js";
import Purchase from "../models/Purchase.js";
import { validate } from "../middlewares/validate.js";
import PaymentMethod from "../models/PaymentMethod.js";
import { currency, merchantAddress, merchantName, razorpayThemeColor } from "../utils/utils.js";

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const router = express.Router();
const stripeObj = stripe(process.env.STRIPE_SECRET_KEY);

router.get("/", validate, async (req, res) => {
    const paymentMethod = await PaymentMethod.findOne();
    const items = await Item.find();
    const paymentMethods = paymentMethod ? {
        razorpay: paymentMethod.razorpay,
        stripe: paymentMethod.stripe,
    } : {
        razorpay: true,
        stripe: true,
    };

    const data = {
        items: items,
        paymentMethods: paymentMethods,
    }

    return res.send(data);
});

router.get("/purchases", validate, async (req, res) => {
    const purchases = (await Purchase.find()).reverse();

    var purchasesData = [];

    for (const purchase of purchases) {
        const item = await Item.findById(purchase.itemId);

        purchasesData.push({
            _id: purchase._id,
            item: item.title,
            amount: purchase.amount,
            paymentMethod: purchase.paymentMethod,
            date: purchase.createdAt.toLocaleString().split(",")[0]
        });
    }

    return res.send(purchasesData);
})

router.post("/invoice", validate, async (req, res) => {
    const schema = joi.object({
        purchaseId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const purchase = await Purchase.findById(data.purchaseId);
        const item = await Item.findById(purchase.itemId);
        const user = await User.findById(purchase.userId);

        if (req.user.type != "admin" && req.user._id != purchase.userId) {
            return res.status(403).send("Forbidden");
        }

        const invoice = {
            purchaseId: purchase._id,
            date: purchase.createdAt.toLocaleString().split(",")[0],
            item: item.title,
            amount: purchase.amount,
            paymentMethod: purchase.paymentMethod,
            to: {
                name: user.name,
                email: user.email,
            },
            from: {
                name: merchantName,
                email: merchantAddress,
            }
        };

        return res.send(invoice);
    }
    catch (err) {
        return res.status(500).send(err);
    }
})

//CREATE ORDER (STRIPE)
router.post("/create-order-stripe", validate, async (req, res) => {
    const schema = joi.object({
        itemId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const item = await Item.findById(data.itemId);

        if (!item) return res.status(400).send("Invalid Item");

        const paymentIntent = await stripeObj.paymentIntents.create({
            amount: item.price * 100,
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        await Order.findOneAndDelete({ userId: req.user._id });

        const newOrder = new Order({
            userId: req.user._id,
            itemId: data.itemId,
            orderId: paymentIntent.id,
            amount: item.price,
            paymentMethod: "stripe",
        });

        await newOrder.save();

        return res.send({
            orderId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (err) {
        return res.status(500).send(err);
    }

});

//CREATE ORDER (RAZORPAY)
router.post('/create-order-razorpay', validate, async (req, res) => {
    const schema = joi.object({
        itemId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const item = await Item.findById(data.itemId);

        if (!item) return res.status(400).send("Invalid Item");

        const orderOptions = {
            amount: item.price * 100,
            currency: currency.toUpperCase(),
            receipt: 'order_rcptid_' + Math.random().toString(),
            payment_capture: 1,
        };

        const order = await instance.orders.create(orderOptions);

        await Order.findOneAndDelete({ userId: req.user._id });

        const newOrder = new Order({
            userId: req.user._id,
            itemId: data.itemId,
            orderId: order.id,
            amount: order.amount / 100,
            paymentMethod: "razorpay",
        });

        const orderData = await newOrder.save();

        const resData = {
            key: razorpayKeyId,
            amount: orderData.amount,
            currency: currency.toUpperCase(),
            name: merchantName,
            description: item.title,
            order_id: orderData.orderId,
            prefill: {
                name: req.user.name,
                email: req.user.email,
            },
            theme: {
                color: razorpayThemeColor
            }
        };

        return res.json(resData);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to create order' });
    }
});

//COMPLETE PURCHASE (STRIPE)
router.post('/verify-stripe-payment', validate, async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findOne({ orderId: orderId });

    if (!order) return res.status(400).send('Invalid Order');

    const newPurchase = new Purchase({
        userId: req.user._id,
        itemId: order.itemId,
        transactionId: orderId,
        paymentMethod: "stripe",
        amount: order.amount,
    });

    const item = await Item.findById(order.itemId);

    await Rewrites.findOneAndUpdate({ userId: req.user._id }, { $inc: { rewrites: item.rewriteLimit } });

    await newPurchase.save();
    await Order.findOneAndDelete({ orderId: orderId });
    return res.send("Success");
});

//COMPLETE PURCHASE (RAZORPAY)
router.post('/verify-razorpay-payment', validate, async (req, res) => {
    const { razorpay_order_id, transactionid, razorpay_signature, transactionamount } = req.body;
    const generated_signature = crypto.createHmac('sha256', razorpayKeySecret)
        .update(razorpay_order_id + '|' + transactionid)
        .digest('hex');

    if (generated_signature === razorpay_signature) {
        const order = await Order.findOne({ orderId: razorpay_order_id });

        if (!order) return res.status(400).send('Invalid Order');

        const newPurchase = new Purchase({
            userId: req.user._id,
            itemId: order.itemId,
            transactionId: transactionid,
            amount: transactionamount,
            paymentMethod: "razorpay",
        });

        const item = await Item.findById(order.itemId);

        await Rewrites.findOneAndUpdate({ userId: req.user._id }, { $inc: { rewrites: item.rewriteLimit } });

        await newPurchase.save();
        await Order.findOneAndDelete({ orderId: razorpay_order_id });

        return res.send("Success");
    } else {
        return res.status(400).send('Payment verification failed');
    }
});

export default router;