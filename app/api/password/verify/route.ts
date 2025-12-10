import { prisma } from "@/services/prisma";
import { HttpStatus } from "@/services/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: { email: string; code: number } = await request.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        isVerified: true,
        code: Number(body.code),
      },
    });

    if (!user)
      return NextResponse.json({
        status: HttpStatus.badRequest,
        message: "Code verification failed",
        data: null,
      });

    return NextResponse.json({
      status: HttpStatus.ok,
      data: null,
      message: "Code verification successful",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: HttpStatus.internalError,
      message: error.message ?? "Code verification failed",
      data: null,
    });
  }
}
