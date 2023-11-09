import { Router } from "express";
import { gameSchema } from "../middlewares/validateSchema.js";
import { postGame } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.post("/games", gameSchema, postGame);

export default gamesRouter;
