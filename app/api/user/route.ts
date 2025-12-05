import { prisma } from "@/services/prisma";
import { TLoginBody } from "@/services/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  const body: TLoginBody = request.body;
  const existingUser = await prisma.user.findFirst({
    where: {
      email: body.email,
      isVerified: true,
    },
  });
  
  return NextResponse.json({ message: "Hello world" });
}
