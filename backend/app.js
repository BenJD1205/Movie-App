import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//PORT
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

//connect DB
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected MONGODB");
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log({ err });
        process.exit(1);
    });
