import { OAuth2Client } from "google-auth-library";
import { UsersModel } from "../../modules/users.model.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Token missing" });

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google token payload:", payload);

    const email = payload.email;
    if (!email) return res.status(400).json({ message: "Email not found in token" });

    let user = await UsersModel.findOne({ email });
    if (!user) {
      user = await UsersModel.create({
        email,
        role: "USER",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(401).json({ message: "Google authentication failed" });
  }
};
