import jwt from "jsonwebtoken";
import { prisma } from "./prisma";
import { TJwtDecoded, TUser } from "./types";

import { cookies } from "next/headers";

export async function removeTokenFromCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export const sendMail = async (user: TUser) => {
  const publicKey = process.env.MAILJET_PUBLIC_KEY;
  const privateKey = process.env.MAILJET_PRIVATE_KEY;
  const senderEmail = process.env.MAILJET_SENDER_EMAIL;
  const auth = Buffer.from(`${publicKey}:${privateKey}`).toString("base64");

  const response = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      Messages: [
        {
          From: { Email: senderEmail, Name: "Inventory Dashboard Support" },
          To: [{ Email: user.email, Name: user.name || "User" }],
          Subject: "Your verification code",
          TextPart: `Your verification code is ${user.code}`,
          HTMLPart: `<h3>Hello ${user.name || "User"},</h3>
                       <p>Your code is <b>${user.code}</b>.</p>
                       <p>This code will expire soon.</p>`,
        },
      ],
    }),
  });

  if (response.ok) return true;
  else return false;
};

export const verifyJwt = async (request: Request) => {
  const auth = request.headers.get("authorization");
  if (!auth) throw new Error("Token is required");

  const token = auth.replace("Bearer ", "").trim();

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as TJwtDecoded;

  if (!decoded?.id) throw new Error("Invalid token");

  const user = await prisma.user.findFirst({
    where: { id: decoded.id },
  });

  if (!user) throw new Error("User not found");

  return user;
};
