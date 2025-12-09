import { prisma } from "@/services/prisma";
import { HttpStatus, TVerification } from "@/services/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: TVerification = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    console.log("user code", user?.code);
    console.log("body code", body.code);

    if (user && user.code === Number(body.code)) {
      console.log("user found and code matched");
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
        },
      });

      if (updated.isVerified)
        return NextResponse.json({
          status: HttpStatus.ok,
          data: null,
          message: "Email verified successfully",
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
      message: "Something went wrong",
    });
  }
}
