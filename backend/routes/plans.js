import express from "express";
import joi from "joi";
import { validate } from "../middlewares/validate.js";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
import stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";
import Purchase from "../models/Purchase.js";
import PaymentMethod from "../models/PaymentMethod.js";

const instance = new Razorpay({
    key_id: "rzp_test_mCodGqhrqtU4wk",
    key_secret: "Sj6z2mGVQmEyy4Ez70GFkNxT",
});

const router = express.Router();
const stripeObj = stripe('sk_test_51NaV1ISCTPV4jDzyit6wwYc33Pd5dXusFYmvgalXDCK5ihTi17DAoARwHf9cqBAuy7U9OPVqKyzZAi5SESANVg1900iW7vcuQm');

router.get("/", validate, async (req, res) => {
    const paymentMethod = await PaymentMethod.findOne();
    const plans = await Plan.find();
    const paymentMethods = paymentMethod ? {
        razorpay: paymentMethod.razorpay,
        stripe: paymentMethod.stripe,
    } : {
        razorpay: true,
        stripe: true,
    };

    const data = {
        plans: plans,
        paymentMethods: paymentMethods,
    }

    return res.send(data);
});

router.post("/create-payment-intent", async (req, res) => {
    const paymentIntent = await stripeObj.paymentIntents.create({
        amount: 1000,
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    console.log("paymentIntent", paymentIntent)
    console.log("paymentIntent.id", paymentIntent.id);

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

//RAZORPAY
router.post('/order', async (req, res) => {
    try {
        const orderOptions = {
            amount: 1000,
            currency: 'INR',
            receipt: 'order_rcptid_' + Math.random().toString(),
            payment_capture: 1,
        };

        const order = await instance.orders.create(orderOptions);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

router.post('/payment', (req, res) => {
    console.log(req.body)
    const { razorpay_order_id, transactionid, razorpay_signature, transactionamount } = req.body;
    const generated_signature = crypto.createHmac('sha256', "Sj6z2mGVQmEyy4Ez70GFkNxT")
        .update(razorpay_order_id + '|' + transactionid)
        .digest('hex');

    if (generated_signature === razorpay_signature) {
        console.log("NEW PAYMENT (TO SAVE IN DB)", {
            transactionid: transactionid,
            transactionamount: transactionamount,
        });

        const newPayment = new Purchase({
            transactionId: transactionid,
            amount: transactionamount,
            userId: req.user._id,
            planId: req.body.planId,
        });

        // transaction.save((err, savedtransac) => {
        // if (err) {
        //     console.error(err);
        //     return res.status(500).send('Some Problem Occurred');
        // }
        res.send("Success");
        // });
    } else {
        res.status(400).send('Payment verification failed');
    }
});

export default router;