import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// Función para manejar errores centralizados
function handleError(error, message = "Error interno del servidor", status = 500) {
  console.error("Error:", error.message || error);
  return NextResponse.json(
    {
      message,
      error: error.message || "Error desconocido",
    },
    { status }
  );
}

// Validar parámetro de PK_service
function validatePKService(PK_service) {
  const id = Number(PK_service);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_service' debe ser un número válido." };
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

      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(`El campo '${field}' no debe exceder los ${rule.maxLength} caracteres.`);
        continue;
      }
    }

    validatedData[field] = value;
  }

  return { valid: errors.length === 0, errors, validatedData };
}

// Método GET: Obtener un servicio específico
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKService(params.PK_service);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const service = await prisma.tbServices.findUnique({
      where: { PK_service: id },
    });

    if (!service) {
      return NextResponse.json(
        { message: `No se encontró ningún servicio con PK_service: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener el servicio");
  }
}

// Método PUT: Actualizar completamente un servicio
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKService(params.PK_service);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      serviceName: { required: true, type: "string", maxLength: 255 },
      description: { required: true, type: "string" },
      valueAdded: { required: true, type: "string" },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedService = await prisma.tbServices.update({
      where: { PK_service: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar completamente el servicio");
  }
}

// Método PATCH: Actualizar parcialmente un servicio
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKService(params.PK_service);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas flexibles
    const validation = validateRequestBody(body, {
      serviceName: { type: "string", maxLength: 255 },
      description: { type: "string" },
      valueAdded: { type: "string" },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedService = await prisma.tbServices.update({
      where: { PK_service: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente el servicio");
  }
}
