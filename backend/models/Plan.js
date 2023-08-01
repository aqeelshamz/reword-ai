import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
    {
        enable: {
            type: Boolean,
            required: true,
            default: false
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        rewriteLimit: {
            type: Number,
            required: true,
        },
        ads: {
            type: Boolean,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        type: {
            type: Number,
            required: true,
            enum: [0, 1, 2, 3], // 0: free, 1: monthly, 2: yearly, 3: lifetime
        }
    },
    { timestamps: true }
);

const Plan = mongoose.model("Plan", PlanSchema);

export default Plan;