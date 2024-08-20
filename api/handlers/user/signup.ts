import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import { hashPassword } from "../../utils/auth";

export const signup = async (req: Request, res: Response) => {
  const { userName, Email, password } = req.body;
  const encryptedpassword = hashPassword(password);
  console.log("here in query");

  try {
    const signupuser = await prisma.user.create({
      data: {
        userName: userName,
        email: Email,
        password: encryptedpassword,
      },
    });

    return res.status(200).json({ success: true, data: signupuser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, information: error, error: "ERROR_ADDING_USER" });
  }
};
