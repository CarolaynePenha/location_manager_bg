import { Router } from "express";
import { reantalsSchema } from "../middlewares/validateSchema.js";
import { getRentals, postRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", reantalsSchema, postRentals);
rentalsRouter.get("/rentals", getRentals);
// rentalsRouter.get("/customers/:id", getCustomerById);
// rentalsRouter.put("/customers/:id", customerSchema, updateCustomer);

export default rentalsRouter;
