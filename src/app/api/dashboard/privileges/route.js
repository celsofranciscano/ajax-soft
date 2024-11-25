import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const privileges = await prisma.tbprivileges.findMany();
    return NextResponse.json(privileges);
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

