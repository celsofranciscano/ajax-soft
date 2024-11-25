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

// Validar parámetro de PK_projectService
function validatePKProjectService(PK_projectService) {
  const id = Number(PK_projectService);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_projectService' debe ser un número válido." };
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

// Método GET: Obtener una relación específica
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKProjectService(params.PK_projectService);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const projectService = await prisma.tbProjectServices.findUnique({
      where: { PK_projectService: id },
      include: {
        tbProjects: { select: { PK_project: true, projectName: true } },
        tbServices: { select: { PK_service: true, serviceName: true } },
      },
    });

    if (!projectService) {
      return NextResponse.json(
        { message: `No se encontró la relación con PK_projectService: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(projectService, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener la relación proyecto-servicio");
  }
}

// Método PUT: Actualizar completamente una relación
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKProjectService(params.PK_projectService);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      FK_project: { required: true, type: "number" },
      FK_service: { required: true, type: "number" },
      status: { required: true, type: "string", maxLength: 20 },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedProjectService = await prisma.tbProjectServices.update({
      where: { PK_projectService: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedProjectService, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar completamente la relación");
  }
}

// Método PATCH: Actualizar parcialmente una relación
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKProjectService(params.PK_projectService);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas flexibles
    const validation = validateRequestBody(body, {
      FK_project: { type: "number" },
      FK_service: { type: "number" },
      status: { type: "string", maxLength: 20 },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedData = validation.validatedData;

    const updatedProjectService = await prisma.tbProjectServices.update({
      where: { PK_projectService: id },
      data: updatedData,
    });

    return NextResponse.json(updatedProjectService, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente la relación");
  }
}
