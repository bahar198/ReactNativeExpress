import { Response, Request } from "express";
import { authorizeToken } from "../../utils/auth";
import prisma from "../../utils/prisma";
import pick from "lodash.pick";

const HEADER_NAME = process.env.SMILE_HEADER_NAME || "X-Auth-Token";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(401).json({ error: "NO_PASSWORD_PROVIDED" });
    }

    const userlogin = await prisma.user.findFirst({
      where: {
        email: { equals: email, mode: "insensitive" },
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        language: true,
        userName: true,
      },
    });

    if (!userlogin) {
      return res.status(401).json({ error: "USER_DOES_NOT_EXIST" });
    }

    // Update user logged in date
    const update = prisma.user.update({
      where: {
        id: userlogin.id,
      },
      data: {
        lastLoginDate: new Date(),
      },
    });

    update.then(function (result) {
      //console.log(result);
    });

    const token = await authorizeToken(
      {
        ...userlogin,
        id: userlogin.id,
        role: userlogin.role,
      },
      password
    );
    res.setHeader(HEADER_NAME, token);
    const user = {
      ...pick(userlogin, ["id", "email"]),
      role: userlogin.role,
      userid: userlogin.id,
      userName: userlogin.userName,
    };
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      information: error,
      error: "ERROR_LOGGING_IN_USER",
    });
  }
};
