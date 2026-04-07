import express from "express";
import cors from "cors";
import healthCheckRouter from "./routes/healthCheck.routes.js";

const app = express();

//Middleware setup
app.use(express.json({ limit: "16kb" })); // to make readable clients json.body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // this will encode our url for safety reson
app.use(express.static("public")); // this tells express about never changing files/data

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (req, res) => {
  res.end("Welcome to project managemnt Api");
});

//Api Route

app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/auth", authRouter);

export default app;
