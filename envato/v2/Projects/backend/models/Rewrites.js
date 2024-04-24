import mongoose from "mongoose";

const RewritesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        rewrites: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Rewrites = mongoose.model("Rewrites", RewritesSchema);

export default Rewrites;