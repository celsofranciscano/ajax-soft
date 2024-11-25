import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// Función para manejar errores centralizados
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

// Función para validar el cuerpo de la solicitud con reglas
function validateRequestBodyWithRules(body, rules) {
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

// Método POST: Crear un nuevo rol
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar el cuerpo con reglas
    const validation = validateRequestBodyWithRules(body, {
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

    const { FK_user, role, status } = validation.validatedData;

    // Verificar si el usuario existe en tbUsers
    const userExists = await prisma.tbUsers.findUnique({
      where: { PK_user: FK_user },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: `No se encontró un usuario con FK_user: ${FK_user}` },
        { status: 404 }
      );
    }

    // Verificar si ya existe un rol con el mismo nombre y usuario
    const roleExists = await prisma.tbroles.findFirst({
      where: { role, FK_user },
    });

    if (roleExists) {
      return NextResponse.json(
        { message: `El rol '${role}' ya existe para el usuario con FK_user: ${FK_user}` },
        { status: 400 }
      );
    }

    // Crear el nuevo rol
    const newRole = await prisma.tbroles.create({
      data: {
        FK_user,
        role,
        status,
      },
    });

    return NextResponse.json(newRole, { status: 201 });
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

// Método GET: Obtener todos los roles
export async function GET() {
  try {
    const roles = await prisma.tbroles.findMany({
      select: {
        PK_role: true,
        FK_user: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tbUsers: {
          select: {
            PK_user: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener los roles");
  }
}