import { prisma } from "@/services/prisma";
import { HttpStatus, TBought } from "@/services/types";
import { verifyJwt } from "@/services/utils-server";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const user = await verifyJwt(request);
  const body = await request.json();
  const { id: productId, quantity, boughtQuantity } = body as TBought;

  try {
    const updated = await prisma.product.update({
      where: {
        id: productId,
        userId: user.id,
      },
      data: {
        quantity: quantity + boughtQuantity,
      },
    });

    return NextResponse.json({
      data: updated,
      message: "Product updated successfully",
      status: HttpStatus.ok,
    });
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      message: error.message || "Failed to update a product",
      status: error.status || HttpStatus.internalError,
    });
  }
}
