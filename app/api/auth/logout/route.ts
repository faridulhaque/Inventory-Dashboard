import { removeTokenFromCookie } from "@/services/utils-server";
import { NextResponse } from "next/server";

export async function PUT() {
  await removeTokenFromCookie();
  return NextResponse.json({ message: "Logged out successful" });
}
