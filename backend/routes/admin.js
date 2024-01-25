import express from "express";
import joi from "joi";
import { validateAdmin } from "../middlewares/validate.js";
import User from "../models/User.js";
import Item from "../models/Item.js";
import PaymentMethod from "../models/PaymentMethod.js";

const router = express.Router();

router.get("/", validateAdmin, async (req, res) => {
    return res.send("Admin Panel");
});

//DASHBOARD START
router.get("/dashboard", validateAdmin, async (req, res) => {
    const users = await User.find().countDocuments();
    const items = await Item.find().countDocuments();
    const purchases = 0;
    const earnings = 0;
    return res.send({ users, items, purchases, earnings });
});
//DASHBOARD END

//PLANS START
router.get("/items", validateAdmin, async (req, res) => {
    return res.send((await Item.find()).reverse());
});

router.post("/items/create", validateAdmin, async (req, res) => {
    const schema = joi.object({
        title: joi.string().required(),
        rewriteLimit: joi.number().required().min(1),
        price: joi.number().required().min(0),
        type: joi.number().required().min(0).max(3), // 0 = free, 1 = monthly, 2 = yearly, 3 = lifetime
    });

    try {
        const data = await schema.validateAsync(req.body);
        const newItem = new Item({
            enable: true,
            userId: req.user._id,
            title: data.title,
            rewriteLimit: data.rewriteLimit,
            price: data.price,
            type: data.type,
        });

        await newItem.save();
        return res.send(newItem);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/items/edit", validateAdmin, async (req, res) => {
    const schema = joi.object({
        itemId: joi.string().required(),
        enable: joi.boolean().required(),
        title: joi.string().required(),
        rewriteLimit: joi.number().required().min(1),
        price: joi.number().required().min(0),
        type: joi.number().required().min(0).max(3), // 0 = free, 1 = monthly, 2 = yearly, 3 = lifetime
    });

    try {
        const data = await schema.validateAsync(req.body);
        await Item.findOneAndUpdate({ _id: data.itemId, userId: req.user._id }, {
            enable: data.enable,
            title: data.title,
            rewriteLimit: data.rewriteLimit,
            price: data.price,
            type: data.type,
        });

        return res.send("Updated!");
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
});

router.post("/items/delete", validateAdmin, async (req, res) => {
    const schema = joi.object({
        itemId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        await Item.findByIdAndDelete(data.itemId);

        return res.send("Deleted!");
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
});
//PLANS END

//PAYMENT METHODS START
router.get("/payment-methods", validateAdmin, async (req, res) => {
    const paymentMethod = await PaymentMethod.findOne();

    if (!paymentMethod) {
        return res.send({ razorpay: true, stripe: true });
    }

    return res.send({
        razorpay: paymentMethod.razorpay,
        stripe: paymentMethod.stripe,
    });
});

router.post("/payment-methods", validateAdmin, async (req, res) => {
    const schema = joi.object({
        razorpay: joi.boolean().required(),
        stripe: joi.boolean().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const paymentMethod = await PaymentMethod.findOne();

        if (!paymentMethod) {
            const newPaymentMethod = new PaymentMethod({
                razorpay: data.razorpay,
                stripe: data.stripe,
            });

            await newPaymentMethod.save();
            return res.send({
                razorpay: newPaymentMethod.razorpay,
                stripe: newPaymentMethod.stripe,
            });
        }

        paymentMethod.razorpay = data.razorpay;
        paymentMethod.stripe = data.stripe;

        await paymentMethod.save();

        return res.send({
            razorpay: paymentMethod.razorpay,
            stripe: paymentMethod.stripe,
        });
    }
    catch (err) {
        return res.status(500).send(err)
    }
});
//PAYMENT METHODS END

//USERS START
router.get("/users", validateAdmin, async (req, res) => {
    return res.send((await User.find().select("-password")).reverse());
});
//USERS END

//SETTINGS START
router.get("/settings", validateAdmin, async (req, res) => {
    return res.send("Users");
});
//SETTINGS END

export default router;
