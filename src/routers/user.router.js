// import express from "express";
// import { getUsers } from "../controller/users/get-users.js";
// import { deleteUser } from "../controller/users/delete-user.js";
// import { updateUser } from "../controller/users/update-user.js";
// import { createUser } from "../controller/users/create-user.js";
// import { loginUser } from "../controller/users/login-user.js";
// import { validateUserId } from "../middleware/users/validate-user-id.js";
// import { forgotPassword } from "../controller/users/forgot-password.js";
// import { resetPassword } from "../controller/users/reset-password.js";
// import { googleAuth } from "../controller/users/google-auth.js";

// export const userRouter = express.Router();

// // Example for src/components/PostUser.tsx
// const handleGoogleLogin = async (credentialResponse) => {
//   await axios.post("http://localhost:4000/user/auth/google", {
//     token: credentialResponse.credential,
//   });
//   // handle response, redirect, etc.
// };

// userRouter.post("/forgot-password", forgotPassword);
// userRouter.post("/auth/google", googleAuth);
// userRouter.post("/reset-password", resetPassword);
// userRouter.get("/", getUsers);
// userRouter.delete("/:id", validateUserId, deleteUser);
// userRouter.put("/:id", validateUserId, updateUser);
// userRouter.post("/", createUser);
// userRouter.post("/login", loginUser);
// userRouter.post("/google-auth", googleAuth);



import express from "express";
import { getUsers } from "../controller/users/get-users.js";
import { deleteUser } from "../controller/users/delete-user.js";
import { updateUser } from "../controller/users/update-user.js";
import { createUser } from "../controller/users/create-user.js";
import { loginUser } from "../controller/users/login-user.js";
import { validateUserId } from "../middleware/users/validate-user-id.js";
import { forgotPassword } from "../controller/users/forgot-password.js";
import { resetPassword } from "../controller/users/reset-password.js";
import { googleAuth } from "../controller/users/google-auth.js";

export const userRouter = express.Router();

// Standard CRUD
userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", validateUserId, updateUser);
userRouter.delete("/:id", validateUserId, deleteUser);

// Password recovery
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

// Google OAuth
userRouter.post("/auth/google", googleAuth);
