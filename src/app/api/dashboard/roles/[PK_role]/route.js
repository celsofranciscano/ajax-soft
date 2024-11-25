import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// Función centralizada para manejar errores
function handleError(error, message = "Error interno del servidor", status = 500) {
  console.error(error);
  return NextResponse.json(
    {
      message,
      error: error.message || "Error desconocido",
    },
    { status }
  );
}

// Validar parámetro de PK_role
function validatePKRole(PK_role) {
  const id = Number(PK_role);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_role' debe ser un número válido." };
  }
  return { valid: true, id };
}

// Validar cuerpo de la solicitud con reglas específicas
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
    }

    validatedData[field] = value;
  }

  return { valid: errors.length === 0, errors, validatedData };
}

// Método GET: Obtener un rol específico
export async function GET(request, { params }) {
  try {
    const role = await prisma.tbroles.findUnique({
      where: { PK_role: id },
      include: {
        tbUsers: {
          select: {
            PK_user: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return NextResponse.json(role);
  } catch (error) {
    return handleError(error, "Error al obtener el rol");
  }
}

// Método PUT: Actualizar completamente un rol
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKRole(params.PK_role);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      FK_user: { required: true, type: "number" },
      role: { required: true, type: "string", minLength: 3, maxLength: 20 },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    // Verificar si el usuario asociado existe
    const userExists = await prisma.tbUsers.findUnique({
      where: { PK_user: validation.validatedData.FK_user },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: `No se encontró un usuario con PK_user: ${validation.validatedData.FK_user}` },
        { status: 404 }
      );
    }

    const updatedRole = await prisma.tbroles.update({
      where: { PK_role: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedRole, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar el rol");
  }
}

// Método PATCH: Actualizar parcialmente un rol
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKRole(params.PK_role);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      FK_user: { type: "number" },
      role: { type: "string", minLength: 3, maxLength: 20 },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    // Si se proporciona FK_user, validar que el usuario existe
    if (validation.validatedData.FK_user) {
      const userExists = await prisma.tbUsers.findUnique({
        where: { PK_user: validation.validatedData.FK_user },
      });

      if (!userExists) {
        return NextResponse.json(
          { message: `No se encontró un usuario con PK_user: ${validation.validatedData.FK_user}` },
          { status: 404 }
        );
      }
    }

    const updatedRole = await prisma.tbroles.update({
      where: { PK_role: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedRole, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente el rol");
  }
}
