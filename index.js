import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppRouter from "./src/routes/index.js";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

dotenv.config({ path: "./config.env" });
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

const DB = process.env.DB_URL;
console.log(DB, "db");
const db = mongoose.connect(DB, {}).then((con) => {
  console.log(con.connections,db);
  console.log("connected successfuly");
});

app.use(cors());
app.use(express.json());
app.use(AppRouter);

app.listen(PORT, () => console.log(`App listening port ${PORT}`));
