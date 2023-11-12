import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoryRouter from "./routers/categoryRouter.js";
import gamesRouter from "./routers/gamesRouter.js";
import customersRouter from "./routers/customersRouter.js";
import rentalsRouter from "./routers/rentalsRouter.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use(categoryRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.listen(process.env.ACCESS_PORT);
