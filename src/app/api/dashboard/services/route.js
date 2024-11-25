import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// Función centralizada para manejar errores
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

// Método GET: Obtener todos los servicios
export async function GET() {
  try {
    const services = await prisma.tbServices.findMany({
      select: {
        PK_service: true,
        serviceName: true,
        description: true,
        valueAdded: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener los servicios");
  }
}

// Método POST: Crear un nuevo servicio
export async function POST(request) {
  try {
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

    const { serviceName, description, valueAdded, status } = validation.validatedData;

    // Crear el nuevo servicio
    const newService = await prisma.tbServices.create({
      data: {
        serviceName,
        description,
        valueAdded,
        status,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "El nombre del servicio ya está registrado." },
        { status: 400 }
      );
    }
    return handleError(error, "Error al registrar el servicio");
  }
}
