import { NextResponse } from "next/server";
import prisma from "@/libs/db";


export async function GET() {

  try {
    const departments = await prisma.tbdepartments.findMany();

    return NextResponse.json(departments);
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



