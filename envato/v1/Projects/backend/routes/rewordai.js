import joi from "joi";
import express from "express";
import Rewrites from "../models/Rewrites.js";
import OpenAI from "openai";
import { validate } from "../middlewares/validate.js";
import { freeItemRewriteCount, lengths, prompt, tones } from "../utils/utils.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const rewriteModel = "gpt-3.5-turbo";
const completionModel = "gpt-3.5-turbo-instruct";
const tokenLengths = [100, 200, 300];

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Reword");
});

router.get("/rewrites", validate, async (req, res) => {
    const rewrites = await Rewrites.findOne({ userId: req.user._id });
    if (!rewrites) {
        const newRewrites = new Rewrites({
            userId: req.user._id,
            rewrites: freeItemRewriteCount,
        });
        await newRewrites.save();
        return res.send(newRewrites);
    }
    return res.send(rewrites);
});

router.post("/rewrite", validate, async (req, res) => {
    const schema = joi.object({
        text: joi.string().required(),
        tone: joi.number().required().min(0).max(4),
        length: joi.number().required().min(0).max(2),
        rewrites: joi.number().required().min(1).max(10),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const rewrites = await Rewrites.findOne({ userId: req.user._id });
        if (!rewrites) {
            const newRewrites = new Rewrites({
                userId: req.user._id,
                rewrites: freeItemRewriteCount,
            });
            await newRewrites.save();
        }

        if (rewrites.rewrites < data.rewrites) return res.status(400).send("Rewrites limit exceeded");

        await Rewrites.findOneAndUpdate({ userId: req.user._id }, { $inc: { rewrites: -data.rewrites } });

        const completion = await openai.chat.completions.create({
            model: rewriteModel,
            messages: [
                { "role": "system", "content": prompt },
                { "role": "user", "content": `{\"text\": \"${data.text}\", \"tone\": \"${tones[data.tone]}\", \"length\": \"${lengths[data.length]}\", \"rewrites\": \"${data.rewrites}\"}` }
            ],
        });

        return res.send(JSON.parse(completion.choices[0].message.content));
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
});

router.post("/continue-writing", validate, async (req, res) => {
    const schema = joi.object({
        text: joi.string().required(),
        length: joi.number().required().min(0).max(2),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.completions.create({
            model: completionModel,
            prompt: `Continue writing: \"${data.text}\"`,
            max_tokens: tokenLengths[data.length],
            temperature: 0,
        });

        return res.send(data.text + response.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/explain", validate, async (req, res) => {
    const schema = joi.object({
        text: joi.string().required(),
        length: joi.number().required().min(0).max(2),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.completions.create({
            model: completionModel,
            prompt: `Explain: \"${data.text}\"`,
            max_tokens: tokenLengths[data.length],
            temperature: 0,
        });

        return res.send(data.text + response.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/give-example", validate, async (req, res) => {
    const schema = joi.object({
        text: joi.string().required(),
        length: joi.number().required().min(0).max(2),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.completions.create({
            model: completionModel,
            prompt: `Give an example for : \"${data.text}\"`,
            max_tokens: tokenLengths[data.length],
            temperature: 0,
        });

        return res.send(data.text + response.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/counterargument", validate, async (req, res) => {
    const schema = joi.object({
        text: joi.string().required(),
        length: joi.number().required().min(0).max(2),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.completions.create({
            model: completionModel,
            prompt: `Counterargument for : \"${data.text}\"`,
            max_tokens: tokenLengths[data.length],
            temperature: 0,
        });

        return res.send(data.text + response.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/define", validate, async (req, res) => {
    const schema = joi.object({
        text: joi.string().required(),
        length: joi.number().required().min(0).max(2),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.completions.create({
            model: completionModel,
            prompt: `Define : \"${data.text}\"`,
            max_tokens: tokenLengths[data.length],
            temperature: 0,
        });

        return res.send(data.text + response.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/shorten", validate, async (req, res) => {
    const schema = joi.object({
        text: joi.string().required(),
        length: joi.number().required().min(0).max(2),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.completions.create({
            model: completionModel,
            prompt: `Shorten this : \"${data.text}\"`,
            max_tokens: 200,
            temperature: 0,
        });

        return res.send(response.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/expand", validate, async (req, res) => {
    const schema = joi.object({
        text: joi.string().required(),
        length: joi.number().required().min(0).max(2),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.completions.create({
            model: completionModel,
            prompt: `Expand this : \"${data.text}\"`,
            max_tokens: 400,
            temperature: 0,
        });

        return res.send(response.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/summarise", validate, async (req, res) => {
    const schema = joi.object({
        text: joi.string().required(),
        length: joi.number().required().min(0).max(2),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.completions.create({
            model: completionModel,
            prompt: `Summarise this : \"${data.text}\"`,
            max_tokens: tokenLengths[data.length],
            temperature: 0,
        });

        return res.send(response.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/generate-text-with-ai", validate, async (req, res) => {
    const schema = joi.object({
        prompt: joi.string().required(),
        length: joi.number().required().min(0).max(2),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.completions.create({
            model: completionModel,
            prompt: data.prompt,
            max_tokens: tokenLengths[data.length],
            temperature: 0,
        });

        return res.send(response.choices[0].text);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

export default router;