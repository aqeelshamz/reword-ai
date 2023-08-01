import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rewordRouter from "./routes/rewordai.js";
import usersRouter from "./routes/users.js";
import documentsRouter from "./routes/documents.js";
import adminRouter from "./routes/admin.js";
import plansRouter from "./routes/plans.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/rewordai", rewordRouter);
app.use("/users", usersRouter);
app.use("/documents", documentsRouter);
app.use("/admin", adminRouter);
app.use("/plans", plansRouter);

app.get("/", (req, res) => {
    res.send("RewordAI API");
});

async function connectDB() {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
}

connectDB();

const port = process.env.PORT || 8080;

app.listen(8080, () => {
    console.log(`Server at http://localhost:${port}`);
});