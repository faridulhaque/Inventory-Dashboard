import { prisma } from "@/services/prisma";
import { HttpStatus } from "@/services/types";
import { verifyJwt } from "@/services/utils-server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await verifyJwt(request);
  const product = await request.json();
  try {
    const created = await prisma.product.create({
      data: {
        ...product,
        user: user,
      },
    });
    return NextResponse.json({
      data: created,
      message: "Product creation successful",
      status: HttpStatus.created,
    });
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      message: error.message || "Failed to create a product",
      status: error.status || HttpStatus.internalError,
    });
  }
}

export async function DELETE(request: Request) {
  const user = await verifyJwt(request);
  const product = await request.json();
  try {
    const deleted = await prisma.product.delete({
      where: {
        id: product?.id,
        user: {
          id: user.id,
        },
      },
    });
    return NextResponse.json({
      data: deleted,
      message: "Product deletion successful",
      status: HttpStatus.ok,
    });
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      message: error.message || "Failed to delete a product",
      status: error.status || HttpStatus.internalError,
    });
  }
}

export async function PUT(request: Request) {
  const user = await verifyJwt(request);
  const body = await request.json();
  const { id: productId, ...product } = body;
  try {
    const updated = await prisma.product.update({
      where: {
        id: productId,
        user: {
          id: user.id,
        },
      },
      data: product,
    });
    return NextResponse.json({
      data: updated,
      message: "Product update successful",
      status: HttpStatus.ok,
    });
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      message: error.message || "Failed to updatd a product",
      status: error.status || HttpStatus.internalError,
    });
  }
}

export async function GET(request: Request) {
  const user = await verifyJwt(request);
  const { page } = await request.json();
  const count = 30;

  try {
    const products = await prisma.product.findMany({
      where: {
        user: { id: user.id },
      },
      take: count,
      skip: page > 1 ? (page - 1) * count : count,
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json({
      data: products,
      message: "Products retrieved successfully",
      status: HttpStatus.ok,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: error.status || HttpStatus.internalError,
      message: error.message || "Something went wrong",
    });
  }
}
