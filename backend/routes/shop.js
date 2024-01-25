import express from "express";
import joi from "joi";
import { validate } from "../middlewares/validate.js";
import Item from "../models/Item.js";
import stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";
import Purchase from "../models/Purchase.js";
import PaymentMethod from "../models/PaymentMethod.js";
import { currency, merchantName, razorpayKeyId, razorpayKeySecret, razorpayThemeColor, stripeKey } from "../utils/utils.js";
import Order from "../models/Order.js";
import Rewrites from "../models/Rewrites.js";

const instance = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
});

const router = express.Router();
const stripeObj = stripe(stripeKey);

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
    } catch (error) {
        console.log(error)
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