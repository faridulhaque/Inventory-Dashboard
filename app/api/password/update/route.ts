import { prisma } from "@/services/prisma";
import { HttpStatus } from "@/services/types";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
const saltRounds = 10;

export async function PUT(request: Request) {
  try {
    const { password, email } = await request.json();
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const saved = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    if (saved) {
      return NextResponse.json({
        status: HttpStatus.ok,
        data: null,
        message: "Password successfully updated",
      });
    } else {
      return NextResponse.json({
        status: HttpStatus.internalError,
        data: null,
        message: "Password updated failed",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: error?.status ?? HttpStatus.internalError,
      data: null,
      message: error?.message ?? "Password updated failed",
    });
  }
}
