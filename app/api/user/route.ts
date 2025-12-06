import { prisma } from "@/services/prisma";
import { HttpStatus, TJwtDecoded, TUser } from "@/services/types";
import { verifyJwt } from "@/services/utils-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await verifyJwt(request);

    return NextResponse.json({
      data: user,
      message: "User retrieved successfully",
      status: HttpStatus.ok,
    });
  } catch (err: any) {
    return NextResponse.json({
      data: null,
      message: err.message || "Something went wrong",
      status: err.status || HttpStatus.internalError,
    });
  }
}

export async function PUT(request: Request) {
  const user = await verifyJwt(request);
  const body = await request.json();

  const data: Partial<TUser> = {};

  for (const key in body) {
    if (key) {
      data[key as keyof TUser] = body[key];
    }
  }
  try {
    const updated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: data,
    });
    if (updated.id) {
      return NextResponse.json({
        data: updated,
        message: "User updated successfully",
        status: HttpStatus.ok,
      });
    } else {
      return NextResponse.json({
        data: null,
        message: "User update failed",
        status: HttpStatus.badRequest,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      message: error.message || "Something went wrong",
      status: error?.status || HttpStatus.internalError,
    });
  }
}
