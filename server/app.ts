import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("hello world"));
app.post("/", (req, res) =>
  res.send(`I've got this message: "${req.body.data}"`)
);

app.listen(PORT, () => console.log(`✅ server is running on port: ${PORT}`));
