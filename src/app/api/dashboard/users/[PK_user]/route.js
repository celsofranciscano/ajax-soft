import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

// Función para manejar errores centralizados
function handleError(error, message = "Error interno del servidor", status = 500) {
  if (error.code === "P2025") {
    // Error específico de Prisma: Registro no encontrado
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
  }
  return NextResponse.json(
    {
      message,
      error: error.message || "Error desconocido",
    },
    { status }
  );
}

// Validar parámetro dinámico PK_user
function validatePKUser(PK_user) {
  const id = Number(PK_user);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_user' debe ser un número válido" };
  }
  return { valid: true, id };
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

// Método GET: Obtener un usuario específico
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKUser(params.PK_user);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const user = await prisma.tbUsers.findUnique({
      where: { PK_user: id },
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
        status: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: `No se encontró ningún usuario con PK_user: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener el usuario");
  }
}

// Método PUT: Actualizar completamente un usuario
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKUser(params.PK_user);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      username: { required: true, type: "string", minLength: 3, maxLength: 50 },
      email: { required: true, type: "string", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      firstName: { required: true, type: "string", maxLength: 10 },
      lastName: { required: true, type: "string", maxLength: 10 },
      career: { required: true, type: "string", maxLength: 20 },
      age: { required: true, type: "number" },
      linkedin: { required: true, type: "string", maxLength: 20 },
      expertiseParagraph: { required: true, type: "string", maxLength: 500 },
      password: { required: true, type: "string", minLength: 8 },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const { password, ...rest } = validation.validatedData;

    // Hashear la contraseña antes de actualizar
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.tbUsers.update({
      where: { PK_user: id },
      data: { ...rest, password: hashedPassword },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar el usuario");
  }
}

// Método PATCH: Actualizar parcialmente un usuario
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKUser(params.PK_user);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas flexibles
    const validation = validateRequestBody(body, {
      username: { type: "string", minLength: 3, maxLength: 50 },
      email: { type: "string", regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      firstName: { type: "string", maxLength: 10 },
      lastName: { type: "string", maxLength: 10 },
      career: { type: "string", maxLength: 20 },
      age: { type: "number" },
      linkedin: { type: "string", maxLength: 20 },
      expertiseParagraph: { type: "string", maxLength: 500 },
      password: { type: "string", minLength: 8 },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const { password, ...rest } = validation.validatedData;

    const updatedData = { ...rest };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.tbUsers.update({
      where: { PK_user: id },
      data: updatedData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente el usuario");
  }
}
