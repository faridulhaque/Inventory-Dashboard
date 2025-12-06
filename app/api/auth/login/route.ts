import { prisma } from "@/services/prisma";
import { HttpStatus, TLoginBody } from "@/services/types";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const body: TLoginBody = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        isVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        data: null,
        message: "User not found or not verified",
        status: HttpStatus.notFound,
      });
    }

    const isMatched = await bcrypt.compare(body.password, user.password);

    if (!isMatched) {
      return NextResponse.json({
        data: null,
        message: "Password did not match",
        status: HttpStatus.unauthorized,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return NextResponse.json({
      data: { token },
      message: "Logged in successfully",
      status: HttpStatus.ok,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: error.status || HttpStatus.internalError,
      message: error.message || "Something went wrong",
    });
  }
}
