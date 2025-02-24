import { Catagory } from "../modules/catagory.model";

export const getCatagory = async (req, res) => {
  const rawUSerdata =await Catagory.find()
  const catagory = rawUSerdata;
  res.send(catagory);
};
