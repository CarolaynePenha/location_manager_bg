import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoryRouter from "./routers/categoryRouter.js";
import gamesRouter from "./routers/gamesRouter.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use(categoryRouter);
app.use(gamesRouter);

app.listen(process.env.ACESS_PORT);
