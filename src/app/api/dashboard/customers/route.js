import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const customers = await prisma.tbcustomers.findMany();
    return NextResponse.json(customers);
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
 
