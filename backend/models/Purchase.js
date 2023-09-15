import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        planId: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        transactionId: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);

export default Purchase;