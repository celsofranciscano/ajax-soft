import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// Funcion para manejar errores de forma centralizada
function handleError(error, message = "Error interno del servidor", status = 500) {
  return NextResponse.json(
    {
      message,
      error: error.message || "Error desconocido",
    },
    { status }
  );
}

// Funcion para validar el cuerpo de la solicitud con reglas
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

// metedo post: Crear un nuevo rol
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar el cuerpo con reglas
    const validation = validateRequestBodyWithRules(body, {
      role: { required: true, type: "string", minLength: 3, maxLength: 50 },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const { role } = validation.validatedData;

    //verificacion de duplicados
    const roleExists = await prisma.tbroles.findUnique({
      where: { role },
    });

    if (roleExists) {
      return NextResponse.json(
        { message: `El rol '${role}' ya existe` },
        { status: 400 }
      );
    }

    // cracion de rol
    const newRole = await prisma.tbroles.create({
      data: { role },
    });

    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    return handleError(error, "Error al crear el rol");
  }
}
