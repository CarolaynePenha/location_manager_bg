import { Router } from "express";
import { customerSchema } from "../middlewares/validateSchema.js";
import {
  getCustomerById,
  getCustomers,
  postCustomer,
  updateCustomer,
} from "../controllers/custumersContoller.js";

const customersRouter = Router();

customersRouter.post("/customers", customerSchema, postCustomer);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.put("/customers/:id", customerSchema, updateCustomer);

export default customersRouter;
