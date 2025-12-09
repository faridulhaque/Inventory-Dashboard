import { prisma } from "@/services/prisma";
import { HttpStatus, TSold } from "@/services/types";
import { verifyJwt } from "@/services/utils-server";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  revalidateTag("products", "max");

  const user = await verifyJwt(request);
  const body = await request.json();
  const { id: productId, quantity, soldQuantity } = body as TSold;

  try {
    const [updated, sold] = await prisma.$transaction([
      prisma.product.update({
        where: {
          id: productId,
          userId: user.id,
        },
        data: {
          quantity: quantity - soldQuantity,
        },
      }),
      prisma.soldProduct.create({
        data: {
          quantity: soldQuantity,
          productId: productId,
        },
      }),
    ]);

    return NextResponse.json({
      data: updated,
      message: "Product updated successfully",
      status: HttpStatus.ok,
    });
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      message: error.message || "Failed to update product",
      status: error.status || HttpStatus.internalError,
    });
  }
}
