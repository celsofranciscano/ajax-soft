import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    const userDetails = await prisma.tbuserdetails.findUnique({
      where: {
        FK_user: Number(params.PK_user),
      },
    });

    console.log(userDetails)
    return NextResponse.json(userDetails);
  } catch (error) {
    console.log(error)
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


