import fs from "fs";
import { Users } from "../modules/comment.model.js";

export const editUser = async (req, res) => {
  const { id } = req.body;
  try{
    await Users.updateOne({_id: id}, {name: "ee"})

  }catch(error){
    res.send(error)
  }

  // const filteredPerson = users.filter((value) => value.username ===  )
};
