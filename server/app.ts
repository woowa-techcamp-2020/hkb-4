import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mysql2, { Pool, QueryError, RowDataPacket } from "mysql2/promise";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => res.send("hello world"));
app.post("/", (req: Request, res: Response) =>
  res.send(`I've got this message: "${req.body.data}"`)
);

const pool: Pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DB,
  password: process.env.DB_PW,
});

pool.query("SELECT * from item", function (
  err: QueryError,
  rows: RowDataPacket[]
) {
  if (err) throw err;
  console.log(`The number of items is: ${rows.length}`);
});

app.listen(PORT, () => console.log(`✅ server is running on port: ${PORT}`));
