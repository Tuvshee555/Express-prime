import { UsersModel } from "../../modules/users.model.js";

export const updateUser = async (req, res) => {
  const { _id, email, password, phonenumber, address, role } = req.body;
  console.log(_id)
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(
      { _id: _id },
      {
        email: email,
        password: password,
        phonenumber: phonenumber,
        address: address,
        role: role,
        
      }

    );
    res.status(202).send(updatedUser);

  } catch (error) {
    res.status(500).send(`Error while updathing user ${error}`);
  }
};
