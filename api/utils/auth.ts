import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

dayjs.tz.setDefault("America/Toronto");

const saltRounds = 12;

const HEADER_NAME = process.env.MARKETS_HEADER_NAME || "X-Auth-Token";

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, saltRounds);
}

export function generateAPIToken(payload: any) {
  const exp = dayjs().utc().add(2, "hours").unix();
  const tokenPayload = {
    ...payload,
    exp,
  };
  return jwt.sign(tokenPayload, process.env.JWTSECRET as string, {
    algorithm: "HS256",
  });
}

export async function authorizeToken(
  useraccount: any,
  candidatePassword: string
) {
  try {
    if (!useraccount) {
      throw "USER_DOES_NOT_EXIST";
    }

    if (bcrypt.compareSync(candidatePassword, useraccount.password)) {
      const token = generateAPIToken({
        email: useraccount.email,
        userId: useraccount.id,
        role: useraccount.role,
      });

      return token;
    } else {
      throw "INVALID_LOGIN";
    }
  } catch (err) {
    throw err;
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenRequest = req.headers.authorization;
  if (!tokenRequest) {
    return res.status(401).json({ error: "TOKEN_IS_MISSING" });
  }

  const token = tokenRequest.slice(7, tokenRequest.length);
  jwt.verify(
    token,
    process.env.JWTSECRET as string,
    (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({ error: "INVALID_TOKEN" });
      } else {
        const validTime = decoded?.exp;
        const now = dayjs().utc().tz("America/New_York");
        if (dayjs(validTime).utc().isSameOrAfter(now)) {
          const newToken = generateAPIToken(decoded);
          res.setHeader(HEADER_NAME, newToken);
        }
        res.locals.user = decoded;

        return next();
      }
    }
  );
}

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.locals.user.role !== "ADMIN") {
    return res.status(401).json({ error: "NOT_AUTHORIZED_FOR_THIS_ACTIVITY" });
  }

  return next();
}
