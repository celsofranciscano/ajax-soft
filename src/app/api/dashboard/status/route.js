import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const status = await prisma.tbstatus.findMany();
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

