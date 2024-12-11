"use server";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAuthToken(newuser) {
  try {
    const token = jwt.sign(
      {
        name: newuser.name,
        email: newuser.email,
      },
      process.env.HASH_KEY,
      { expiresIn: "1d" }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req, res) {
  const { email, password, name } = await req.json();
  if (!email) {
    return Response.json({ Success: false, msg: "Enter your email" });
  } else if (!name) {
    return Response.json({ Success: false, msg: "Enter your Name" });
  } else if (!password) {
    return Response.json({ Success: false, msg: "Enter your Password" });
  }

  const user = {
    name,
    email,
    password,
  };

  if (user.email === process.env.EMAIL) {
    if (user.password === process.env.PASSWORD) {
      const authToken = generateAuthToken(user);
      return Response.json({
        Success: true,
        msg: "Logging In",
        AuthToken: authToken,
      });
    } else {
      return Response.json({ Success: false, msg: "Wrong Password" });
    }
  } else {
    return Response.json({ Success: false, msg: "Not Authorized" });
  }
}
