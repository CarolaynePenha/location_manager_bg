import { Router } from "express";
import { reantalsSchema } from "../middlewares/validateSchema.js";
import {
  deleteRental,
  getRentals,
  postRentals,
  postReturn,
} from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", reantalsSchema, postRentals);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals/:id/return", postReturn);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;
