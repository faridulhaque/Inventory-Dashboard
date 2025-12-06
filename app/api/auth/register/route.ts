import { prisma } from "@/services/prisma";
import { HttpStatus, TRegisterBody } from "@/services/types";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/services/utils-server";

const saltRounds = 10;

export async function POST(req: Request) {
  const body: TRegisterBody = await req.json();

  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (user?.isVerified) {
      return NextResponse.json({
        status: HttpStatus.conflict,
        data: null,
        message: "The email is already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const code = Math.floor(1000 + Math.random() * 9000);

    const saved = user
      ? await prisma.user.update({
          where: { email: body.email },
          data: { name: body.name, password: hashedPassword, code },
        })
      : await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            password: hashedPassword,
            code,
          },
        });

    const ok = await sendMail(saved);

    return NextResponse.json({
      status: ok ? HttpStatus.ok : HttpStatus.notFound,
      data: null,
      message: ok
        ? "An email has been sent with verification code"
        : "Email sending failed",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: error.status || HttpStatus.internalError,
      message: error.message || "Something went wrong",
    });
  }
}
