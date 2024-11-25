import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const stages = await prisma.tbstages.findMany();
    return NextResponse.json(stages);
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

