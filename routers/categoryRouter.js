import { Router } from "express";

import { categorySchema } from "../middlewares/validateSchema.js";
import {
  getCategory,
  postCategory,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.post("/categories", categorySchema, postCategory);
categoryRouter.get("/categories", getCategory);

export default categoryRouter;
