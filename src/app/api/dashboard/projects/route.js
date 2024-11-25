import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const projects = await prisma.tbprojects.findMany();
    return NextResponse.json(projects);
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

