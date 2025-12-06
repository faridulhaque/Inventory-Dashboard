import { prisma } from "@/services/prisma";
import { HttpStatus } from "@/services/types";
import { verifyJwt } from "@/services/utils-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await verifyJwt(request);

    const productsCount = await prisma.product.count({
      where: { userId: user.id },
    });

    const totalUnitsAgg = await prisma.product.aggregate({
      where: { userId: user.id },
      _sum: { quantity: true },
    });
    const totalUnits = totalUnitsAgg._sum.quantity || 0;

    const soldUnitsAgg = await prisma.soldProduct.aggregate({
      where: {
        product: { userId: user.id },
      },
      _sum: { quantity: true },
    });
    const totalSoldUnits = soldUnitsAgg._sum.quantity || 0;

    const soldItems = await prisma.soldProduct.findMany({
      where: {
        product: { userId: user.id },
      },
      select: {
        quantity: true,
        product: { select: { price: true } },
      },
    });

    const totalEarning = soldItems.reduce((sum, item) => {
      return sum + item.quantity * Number(item.product?.price || 0);
    }, 0);

    const products = await prisma.product.findMany({
      where: { userId: user.id },
      select: { quantity: true, lowStockAt: true },
      orderBy: {
        lowStockAt: "asc",
      },
    });

    const lowStock = products.filter(
      (p) => p.lowStockAt !== null && p.quantity < p.lowStockAt
    ).length;

    const lowStockPercentage =
      products.length === 0 ? 0 : (lowStock / products.length) * 100;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const salesLast7 = await prisma.soldProduct.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        product: { userId: user.id },
      },
      select: {
        quantity: true,
        createdAt: true,
      },
    });

    const dailySalesObj: Record<string, number> = {};

    for (const sale of salesLast7) {
      const date = sale.createdAt.toISOString().split("T")[0];
      dailySalesObj[date] = (dailySalesObj[date] || 0) + sale.quantity;
    }

    const dailySales = Object.keys(dailySalesObj).map((key) => ({
      date: key,
      units: dailySalesObj[key],
    }));

    return NextResponse.json({
      status: HttpStatus.ok,
      message: "Dashboard data loaded",
      data: {
        productsCount,
        totalUnits,
        totalSoldUnits,
        totalEarning,
        lowStockPercentage,
        dailySales,
        products,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: error?.status || HttpStatus.internalError,
      message: error?.message || "Something went wrong",
      data: null,
    });
  }
}
