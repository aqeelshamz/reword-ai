import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.ObjectId, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Document = mongoose.model("Document", DocumentSchema);

export default Document;