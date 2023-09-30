import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

mongoose.set("strictQuery", false); // Deprecation issue

const DB =
  process.env.DATABASE?.replace(
    "<password>",
    process.env.DATABASE_PASSWORD || ""
  ) ?? ""; // fetch the connection variable from env file and replace it with another env variable

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as any)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log((err as any).name, err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Received! Shutting down...");
  server.close(() => {
    console.log("Process Terminated!");
  });
});

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello you, we're up and running!");
});

app.use("/employee", employeeRoutes);

app.get("/*", (req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`app is running on port: ${port}`);
});

export { app };
