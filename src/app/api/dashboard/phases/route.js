import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const phases = await prisma.tbphases.findMany();
    return NextResponse.json(phases);
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

