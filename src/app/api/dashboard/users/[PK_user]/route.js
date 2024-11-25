import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const user = await prisma.tbusers.findUnique({
      where: {
        PK_user: Number(params.PK_user),
      },
    });
    return NextResponse.json(user);
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
