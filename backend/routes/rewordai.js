import express from "express";
import joi from "joi";
import { freePlanRewriteCount, lengths, prompt, tones } from "../utils/utils.js";
import { Configuration, OpenAIApi } from "openai";
import { validate } from "../middlewares/validate.js";
import Rewrites from "../models/Rewrites.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Reword");
});

router.get("/rewrites", validate, async (req, res) => {
    const rewrites = await Rewrites.findOne({ userId: req.user._id });
    if (!rewrites) {
        const newRewrites = new Rewrites({
            userId: req.user._id,
            rewrites: freePlanRewriteCount,
        });
        await newRewrites.save();
        return res.send(newRewrites);
    }
    return res.send(rewrites);
});

router.post("/rewrite", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

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
                rewrites: freePlanRewriteCount,
            });
            await newRewrites.save();
        }

        if (rewrites.rewrites < data.rewrites) return res.status(400).send("Rewrites limit exceeded");

        await Rewrites.findOneAndUpdate({ userId: req.user._id }, { $inc: { rewrites: -data.rewrites } });

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": prompt },
                { "role": "user", "content": `{\"text\": \"${data.text}\", \"tone\": \"${tones[data.tone]}\", \"length\": \"${lengths[data.length]}\", \"rewrites\": \"${data.rewrites}\"}` }
            ],
        });

        return res.send(JSON.parse(completion.data.choices[0].message.content));
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
});

router.post("/continue-writing", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        text: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Continue writing: \"${data.text}\"`,
            max_tokens: 500,
            temperature: 0,
        });

        return res.send(data.text + response.data.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/explain", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        text: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Explain: \"${data.text}\"`,
            max_tokens: 250,
            temperature: 0,
        });

        return res.send(data.text + response.data.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/give-example", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        text: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Give an example for : \"${data.text}\"`,
            max_tokens: 250,
            temperature: 0,
        });

        return res.send(data.text + response.data.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/counterargument", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        text: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Counterargument for : \"${data.text}\"`,
            max_tokens: 250,
            temperature: 0,
        });

        return res.send(data.text + response.data.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/define", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        text: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Define : \"${data.text}\"`,
            max_tokens: 250,
            temperature: 0,
        });

        return res.send(data.text + response.data.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/shorten", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        text: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Shorten this : \"${data.text}\"`,
            max_tokens: 100,
            temperature: 0,
        });

        return res.send(response.data.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/expand", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        text: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Expand this : \"${data.text}\"`,
            max_tokens: 250,
            temperature: 0,
        });

        return res.send(response.data.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/summarise", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        text: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Summarise this : \"${data.text}\"`,
            max_tokens: 250,
            temperature: 0,
        });

        return res.send(response.data.choices[0].text.replaceAll("\n", " "));
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/generate-text-with-ai", validate, async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const schema = joi.object({
        prompt: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: data.prompt,
            max_tokens: 500,
            temperature: 0,
        });

        return res.send(response.data.choices[0].text);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

export default router;