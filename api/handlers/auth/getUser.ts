import { Response, Request } from "express";
import prisma from "../../utils/prisma";

export const getUser = async (req: Request, res: Response) => {
  try {
    const usrid = res.locals.user.userId;
    const user = prisma.user.findUnique({
      where: {
        id: usrid,
      },
      select: {
        id: true,
        email: true,
        language: true,
        password: true,
        role: true,
        userName: true,
      },
    });
    if (!user) return res.status(401).json({ error: "USER_DOES_NOT_EXIST " });
    const UserData = {
      ...user,
    };
    return res.status(200).json({ success: true, data: UserData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      information: error,
      error: "ERROR_FETCHING_USER",
    });
  }
};
