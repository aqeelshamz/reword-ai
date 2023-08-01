import express from "express";
import joi from "joi";
import { validateAdmin } from "../middlewares/validate.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", validateAdmin, async (req, res) => {
    return res.send("Admin Panel");
});

router.get("/dashboard", validateAdmin, async (req, res) => {
    return res.send("Admin Panel");
});

router.get("/dashboard", validateAdmin, async (req, res) => {
    return res.send("Admin Panel");
});

router.get("/plans", validateAdmin, async (req, res) => {
    return res.send("Plans");
});

router.get("/payment-methods", validateAdmin, async (req, res) => {
    return res.send("Payment methods");
});

router.get("/users", validateAdmin, async (req, res) => {
    return res.send((await User.find().select("-password")).reverse());
});

router.get("/settings", validateAdmin, async (req, res) => {
    return res.send("Users");
});

export default router;
