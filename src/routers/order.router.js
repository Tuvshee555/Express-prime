import { Router } from "express";
import { createFoodOrder } from "../controller/orders/create-orders.js";
import { deleteFoodOrder } from "../controller/orders/delete-orders.js";
import { getFoodOrder } from "../controller/orders/get-orders.js";
import { updatedFoodOrder } from "../controller/orders/update-orders.js";
import { validateFoodOrder  } from "../middleware/users/validate-orders.js";

export const orderRouter = Router()
orderRouter.post("/", createFoodOrder)
orderRouter.delete("/", validateFoodOrder, deleteFoodOrder)
orderRouter.get("/", validateFoodOrder, getFoodOrder)
orderRouter.put("/", updatedFoodOrder)