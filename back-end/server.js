import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(cors());

//  Get all data from .env
config();
const port = process.env.PORT;

//parsing JSON requests to data -> req.body
app.use(json());
app.use(urlencoded({ extended: false }));

//setting server port
app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));