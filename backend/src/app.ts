import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { Request, Response, NextFunction } from 'express';

// Xử lý __dirname cho ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
const app = express();

// CORS cấu hình
app.use(
   cors({
      origin: true,
      credentials: true,
   })
);

app.use(
   express.json({
      limit: "1000mb",
   })
);

app.use(
   express.urlencoded({
      limit: "1000mb",
      extended: false,
   })
);

const corsOptions = {
   origin: "*",
   credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/plugins", express.static(path.join(__dirname, "/plugins")));
app.use("/public", express.static(path.join(__dirname, "/public")));

import productRouter from "./router/product.js";
app.use("/api/product", productRouter);

// 404 handler
app.use(function (req, res, next) {
   next(createError(404));
});

// Error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
   res.locals.message = err.message;
   res.locals.error = req.app.get("env") === "development" ? err : {};

   res.status(err.status || 500);
   res.render("error");
});

export default app;
