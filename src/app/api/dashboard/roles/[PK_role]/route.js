import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// funcion para manejar errores de forma centralizada
function handleError(error, message = "Error interno del servidor", status = 500) {
  return NextResponse.json(
    {
      message,
      error: error.message || "Error desconocido",
    },
    { status }
  );
}

// validar parametro de pk_role
function validatePKRole(PK_role) {
  const id = Number(PK_role);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_role' debe ser un número válido" };
  }
  return { valid: true, id };
}

// validar cuerpo de la solicitud con reglas, "integracion de datos"
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

// metodo post que optiene un rol especifico
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKRole(params.PK_role);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const role = await prisma.tbroles.findUnique({
      where: { PK_role: id },
    });

    if (!role) {
      return NextResponse.json(
        { message: `No se encontró ningún rol con PK_role: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener el rol");
  }
}

// metodo put para actualizar un rol completamente
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKRole(params.PK_role);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    //integracion de los datos
    const validation = validateRequestBody(body, {
      role: { required: true, type: "string", minLength: 3, maxLength: 50 },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
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

// metodo patch, para actualizar un rol de forma parcial
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKRole(params.PK_role);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // validar datos de forma flexible
    const validation = validateRequestBody(body, {
      role: { type: "string", minLength: 3, maxLength: 50 },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
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
