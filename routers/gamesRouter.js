import { Router } from "express";
import { gameSchema } from "../middlewares/validateSchema.js";
import { getGames, postGame } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.post("/games", gameSchema, postGame);
gamesRouter.get("/games", getGames);

export default gamesRouter;
