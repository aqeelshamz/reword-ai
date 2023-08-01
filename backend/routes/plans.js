import express from "express";
import joi from "joi";
import { validate } from "../middlewares/validate.js";
import User from "../models/User.js";
import Plan from "../models/Plan.js";

const router = express.Router();

router.get("/", validate, async (req, res) => {
    return res.send(await Plan.find());
});

export default router;