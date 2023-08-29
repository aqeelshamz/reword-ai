import express from "express";
import joi from "joi";
import { validateAdmin } from "../middlewares/validate.js";
import User from "../models/User.js";
import Plan from "../models/Plan.js";

const router = express.Router();

router.get("/", validateAdmin, async (req, res) => {
    return res.send("Admin Panel");
});

//DASHBOARD START
router.get("/dashboard", validateAdmin, async (req, res) => {
    return res.send("Admin Panel");
});
//DASHBOARD END

//PLANS START
router.get("/plans", validateAdmin, async (req, res) => {
    return res.send((await Plan.find()).reverse());
});

router.post("/plans/create", validateAdmin, async (req, res) => {
    const schema = joi.object({
        title: joi.string().required(),
        rewriteLimit: joi.number().required().min(1),
        ads: joi.boolean().required(),
        price: joi.number().required().min(0),
        type: joi.number().required().min(0).max(3), // 0 = free, 1 = monthly, 2 = yearly, 3 = lifetime
    });

    try {
        const data = await schema.validateAsync(req.body);
        const newPlan = new Plan({
            enable: true,
            userId: req.user._id,
            title: data.title,
            rewriteLimit: data.rewriteLimit,
            ads: data.ads,
            price: data.price,
            type: data.type,
        });

        await newPlan.save();
        return res.send(newPlan);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/plans/edit", validateAdmin, async (req, res) => {
    const schema = joi.object({
        planId: joi.string().required(),
        enable: joi.boolean().required(),
        title: joi.string().required(),
        rewriteLimit: joi.number().required().min(1),
        ads: joi.boolean().required(),
        price: joi.number().required().min(0),
        type: joi.number().required().min(0).max(3), // 0 = free, 1 = monthly, 2 = yearly, 3 = lifetime
    });

    try {
        const data = await schema.validateAsync(req.body);
        await Plan.findOneAndUpdate({ _id: data.planId, userId: req.user._id }, {
            enable: data.enable,
            title: data.title,
            rewriteLimit: data.rewriteLimit,
            ads: data.ads,
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

router.post("/plans/delete", validateAdmin, async (req, res) => {
    const schema = joi.object({
        planId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        await Plan.findByIdAndDelete(data.planId);

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
    return res.send("Payment methods");
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
