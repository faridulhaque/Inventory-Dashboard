import { prisma } from "@/services/prisma";
import { HttpStatus, TVerification } from "@/services/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: TVerification = await request.json();

  try {
    const updated = await prisma.user.updateMany({
      where: {
        email: body.email,
        code: body.code,
      },
      data: {
        isVerified: true,
      },
    });

    if (updated.count === 1) {
      return NextResponse.json({
        status: HttpStatus.ok,
        data: null,
        message: "You are successfully verified",
      });
    }

    return NextResponse.json({
      status: HttpStatus.notFound,
      data: null,
      message: "Failed to verify your email",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: error.status || HttpStatus.internalError,
      message: error.message || "Something went wrong",
    });
  }
}
