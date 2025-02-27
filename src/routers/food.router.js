import { Router } from "express";
import { createFood } from "../controller/foods/create-food.js";
import { deleteFood } from "../controller/foods/delete-food.js";
import { getFood } from "../controller/foods/get-food.js";
import { updateFood } from "../controller/foods/update-food.js";
import { validateFood } from "../middleware/users/validate-foods.js";

export const FoodRouter = Router();

FoodRouter.post("/", createFood);
FoodRouter.delete("/", validateFood, deleteFood);
FoodRouter.get("/", validateFood, getFood);
FoodRouter.put("/", updateFood);
