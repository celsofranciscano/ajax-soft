import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const categories = await prisma.tbcategories.findMany();
    return NextResponse.json(categories);
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

