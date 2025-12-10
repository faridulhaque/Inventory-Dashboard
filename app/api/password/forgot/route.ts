import { prisma } from "@/services/prisma";
import { HttpStatus, TUser } from "@/services/types";
import { sendMail } from "@/services/utils-server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: { email: string } = await request.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      isVerified: true,
    },
  });

  if (!user)
    return NextResponse.json({
      status: HttpStatus.notFound,
      message: "You are not a registered user",
      data: null,
    });

  const code = Math.floor(1000 + Math.random() * 9000);
  try {
    const updated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        code: code,
      },
    });
    // const ok = await sendMail(updated);
    console.log("updated", updated.code);
    const ok = true;
    if (ok)
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
      message: error.message || "Failed to reset password",
    });
  }
}
