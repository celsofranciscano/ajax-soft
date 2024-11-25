import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const roles = await prisma.tbroles.findMany();
    return NextResponse.json(roles);
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

