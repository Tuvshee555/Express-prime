import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  catagoryName: { type: String, require: true },
});

export const CategoriesModel = mongoose.model("categories", categoriesSchema);
