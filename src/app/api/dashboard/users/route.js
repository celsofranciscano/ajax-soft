import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

// Función para manejar errores centralizados
function handleError(error, message = "Error interno del servidor", status = 500) {
  return NextResponse.json(
    {
      message,
      error: error.message || "Error desconocido",
    },
    { status }
  );
}

// Función para validar el cuerpo de la solicitud con reglas
function validateRequestBody(body, rules) {
  const errors = [];
  const validatedData = {};

  for (const field in rules) {
    const rule = rules[field];
    const value = body[field];

    if (rule.required && (value === undefined || value === null)) {
      errors.push(`El campo '${field}' es obligatorio.`);
      continue;
    }

    if (value !== undefined) {
      if (rule.type && typeof value !== rule.type) {
        errors.push(`El campo '${field}' debe ser de tipo ${rule.type}.`);
        continue;
      }

      if (rule.minLength && value.length < rule.minLength) {
        errors.push(`El campo '${field}' debe tener al menos ${rule.minLength} caracteres.`);
        continue;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(`El campo '${field}' no debe exceder los ${rule.maxLength} caracteres.`);
        continue;
      }

      if (rule.regex && !rule.regex.test(value)) {
        errors.push(`El campo '${field}' tiene un formato inválido.`);
        continue;
      }
    }

    validatedData[field] = value;
  }

  return { valid: errors.length === 0, errors, validatedData };
}

// Método GET: Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.tbUsers.findMany({
      select: {
        PK_user: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        career: true,
        age: true,
        linkedin: true,
        expertiseParagraph: true,
        createdAt: true,
        updatedAt: true,
        status: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener los usuarios");
  }
}

// Método POST: Crear un nuevo usuario
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      username: { required: true, type: "string", minLength: 3, maxLength: 50, regex: /^[a-zA-Z0-9_]+$/ },
      email: { required: true, type: "string", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      password: { required: true, type: "string", minLength: 8 },
      firstName: { required: true, type: "string", maxLength: 10 },
      lastName: { required: true, type: "string", maxLength: 10 },
      career: { required: true, type: "string", maxLength: 20 },
      age: { required: true, type: "number", minLength: 18 },
      linkedin: { required: true, type: "string", maxLength: 20 },
      expertiseParagraph: { required: true, type: "string", maxLength: 500 },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const {
      username,
      email,
      password,
      firstName,
      lastName,
      career,
      age,
      linkedin,
      expertiseParagraph,
      status,
    } = validation.validatedData;

    // Verificar si el email o username ya están registrados
    const existingUser = await prisma.tbUsers.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: `El email o nombre de usuario ya está registrado` },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await prisma.tbUsers.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        career,
        age,
        linkedin,
        expertiseParagraph,
        status,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    // Manejar errores de Prisma
    if (error.code === "P2002") {
      return handleError(error, "El email o nombre de usuario ya están registrados", 400);
    }

    return handleError(error, "Error al registrar el usuario");
  }
}
