import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// Función para manejar errores
function handleError(error, message = "Error interno del servidor", status = 500) {
  if (error.code === "P2025") {
    return NextResponse.json({ message: "Registro no encontrado" }, { status: 404 });
  }
  return NextResponse.json(
    {
      message,
      error: error.message || "Error desconocido",
    },
    { status }
  );
}

// Validar parámetro PK_user de forma dinámica
function validatePKUser(PK_user) {
  const id = Number(PK_user);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_user' debe ser un número válido" };
  }
  return { valid: true, id };
}

// Validar cuerpo de la solicitud
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

      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(`El campo '${field}' no debe exceder los ${rule.maxLength} caracteres.`);
        continue;
      }
    }

    validatedData[field] = value;
  }

  return { valid: errors.length === 0, errors, validatedData };
}

// Método GET: Obtener un detalle de usuario específico
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKUser(params.PK_user);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const userDetails = await prisma.tbuserdetails.findUnique({
      where: { FK_user: id },
    });

    if (!userDetails) {
      return NextResponse.json(
        { message: `No se encontró ningún detalle para el usuario con PK_user: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(userDetails, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener los detalles del usuario");
  }
}

// Método PUT: Actualizar completamente detalles de usuario
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKUser(params.PK_user);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      phoneNumber: { type: "string", maxLength: 15 },
      address: { type: "string", maxLength: 255 },
      dateOfBirth: { type: "string" }, // Se espera formato ISO
      hireDate: { type: "string" }, // Se espera formato ISO
      position: { type: "string", maxLength: 80 },
      salary: { required: true, type: "string", maxLength: 30 },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedUserDetails = await prisma.tbuserdetails.update({
      where: { FK_user: id },
      data: {
        ...validation.validatedData,
        dateOfBirth: validation.validatedData.dateOfBirth
          ? new Date(validation.validatedData.dateOfBirth)
          : null,
        hireDate: validation.validatedData.hireDate
          ? new Date(validation.validatedData.hireDate)
          : null,
      },
    });

    return NextResponse.json(updatedUserDetails, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar completamente los detalles del usuario");
  }
}

// Método PATCH: Actualizar parcialmente detalles de usuario
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKUser(params.PK_user);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas flexibles
    const validation = validateRequestBody(body, {
      phoneNumber: { type: "string", maxLength: 15 },
      address: { type: "string", maxLength: 255 },
      dateOfBirth: { type: "string" }, // Se espera formato ISO
      hireDate: { type: "string" }, // Se espera formato ISO
      position: { type: "string", maxLength: 80 },
      salary: { type: "string", maxLength: 30 },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const dataToUpdate = {
      ...validation.validatedData,
      dateOfBirth: validation.validatedData.dateOfBirth
        ? new Date(validation.validatedData.dateOfBirth)
        : undefined,
      hireDate: validation.validatedData.hireDate
        ? new Date(validation.validatedData.hireDate)
        : undefined,
    };

    const updatedUserDetails = await prisma.tbuserdetails.update({
      where: { FK_user: id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedUserDetails, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente los detalles del usuario");
  }
}
