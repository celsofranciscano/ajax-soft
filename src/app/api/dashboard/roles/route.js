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

export async function POST(request) {
  try {
    const { role } = await request.json();

    if (!role) {
      return NextResponse.json(
        { message: "El campo 'role' es obligatorio" },
        { status: 400 }
      );
    }

    const roleExists = await prisma.tbroles.findUnique({
      where: {
        role: role,
      },
    });

    if (roleExists) {
      return NextResponse.json(
        { message: "El rol ya existe" },
        { status: 400 }
      );
    }

    const newRole = await prisma.tbroles.create({
      data: {
        role,
      },
    });

    return NextResponse.json(newRole);
  } catch {
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
