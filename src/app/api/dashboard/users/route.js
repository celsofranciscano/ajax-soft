import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

// funcion para manejo de errores de forma centralizada
function handleError(error, message = "Error interno del servidor", status = 500) {
  return NextResponse.json(
    {
      message,
      error: error.message || "Error desconocido",
    },
    { status }
  );
}

// Validar cuerpo de la solicitud con reglas
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

// metodo get, que muestra todos los usuario
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

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener los usuarios");
  }
}

// Metodo post
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      FK_role: { required: true, type: "number" },
      firstName: { required: true, type: "string", minLength: 2, maxLength: 80 },
      lastName: { required: true, type: "string", minLength: 2, maxLength: 80 },
      CI: { required: true, type: "string", maxLength: 20 },
      email: { required: true, type: "string", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      password: { required: true, type: "string", minLength: 8 },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const { FK_role, firstName, lastName, CI, email, password } = validation.validatedData;

    // Verrificion del email
    const emailFound = await prisma.tbusers.findUnique({ where: { email } });
    if (emailFound) {
      return NextResponse.json(
        { message: "El email ya está registrado" },
        { status: 400 }
      );
    }

    // Verificar si el CI ya se registro
    const CIExists = await prisma.tbusers.findUnique({ where: { CI } });
    if (CIExists) {
      return NextResponse.json(
        { message: "El CI ya está registrado" },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await prisma.tbusers.create({
      data: {
        FK_role,
        firstName,
        lastName,
        CI,
        email,
        password: hashedPassword,
        status: true, // Asume que un usuario esta activo de momento
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return handleError(error, "Error al registrar el usuario");
  }
}
