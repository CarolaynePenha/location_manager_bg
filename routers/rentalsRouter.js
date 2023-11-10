import { Router } from "express";
import { reantalsSchema } from "../middlewares/validateSchema.js";
import { postRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", reantalsSchema, postRentals);
// rentalsRouter.get("/customers", getCustomers);
// rentalsRouter.get("/customers/:id", getCustomerById);
// rentalsRouter.put("/customers/:id", customerSchema, updateCustomer);

export default rentalsRouter;
