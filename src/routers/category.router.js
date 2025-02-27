import { Router } from "express";
import { deleteCatagories } from "../controller/categories/delete-categories.js";
import { createCatagories } from "../controller/categories/create-categories.js";
import { getCategories } from "../controller/categories/get-catagories.js";
import { updateCategories } from "../controller/categories/update-categories.js";
import { validateCategoriesId } from "../middleware/users/validate-categories.js";

export const categoryRouter = Router()

categoryRouter.delete("/", deleteCatagories)
categoryRouter.post("/", validateCategoriesId, createCatagories)
categoryRouter.get("/", validateCategoriesId, getCategories)
categoryRouter.put("/", updateCategories)