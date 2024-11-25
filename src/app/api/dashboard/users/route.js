import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export async function GET() {

  try {
    const users = await prisma.tbusers.findMany({
      select: {
        PK_user: true,
        FK_role: true,
        CI: true,
        firstName: true,  
        lastName: true,
        email: true,
        status: true,
      },
    });

    return NextResponse.json(users);
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
    const { FK_role, firstName, lastName, CI, email, password } = await request.json();

    // Validar que todos los campos requeridos estén presentes
    if (!FK_role || !firstName || !lastName || !CI || !email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Formato de email inválido" },
        { status: 400 }
      );
    }

    // Verificar si el email ya está registrado en la base de datos
    const emailFound = await prisma.tbusers.findUnique({
      where: {
        email: email,
      },
    });

    if (emailFound) {
      return NextResponse.json(
        { message: "El email ya está registrado" },
        { status: 400 }
      );
    }

    // Verificar si el CI ya está registrado en la base de datos
    const CIExists = await prisma.tbusers.findMany({
      where: {
        CI: CI,
      },
    });

    if (CIExists.length >= 1) {
      return NextResponse.json(
        { message: "El CI ya está registrado" },
        { status: 400 }
      );
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 8) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = await prisma.tbusers.create({
      data: {
        FK_role: Number(FK_role),
        firstName,
        lastName,
        CI,
        email,
        password: hashedPassword,
        // Añade otras propiedades del usuario si es necesario
      },
    });

    // Devolver el usuario creado
    return NextResponse.json(newUser);
  } catch (error) {
    // Controlar errores inesperados
    console.error("Error al registrar el usuario:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Este email ya está registrado en el sistema" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: error.message +"Error interno del servidor" },
      { status: 500 }
    );
  }
}
