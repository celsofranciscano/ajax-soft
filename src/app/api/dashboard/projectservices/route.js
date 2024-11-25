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

// Método GET: Obtener todas las relaciones proyecto-servicio
export async function GET() {
  try {
    const projectServices = await prisma.tbProjectServices.findMany({
      select: {
        PK_projectService: true,
        FK_project: true,
        FK_service: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tbProjects: {
          select: {
            PK_project: true,
            projectName: true,
          },
        },
        tbServices: {
          select: {
            PK_service: true,
            serviceName: true,
          },
        },
      },
    });

    return NextResponse.json(projectServices, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener las relaciones proyecto-servicio");
  }
}

// Método POST: Crear una nueva relación proyecto-servicio
export async function POST(request) {
  try {
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

    const { FK_project, FK_service, status } = validation.validatedData;

    // Verificar si el proyecto existe
    const projectExists = await prisma.tbProjects.findUnique({
      where: { PK_project: FK_project },
    });

    if (!projectExists) {
      return NextResponse.json(
        { message: `No se encontró un proyecto con FK_project: ${FK_project}` },
        { status: 404 }
      );
    }

    // Verificar si el servicio existe
    const serviceExists = await prisma.tbServices.findUnique({
      where: { PK_service: FK_service },
    });

    if (!serviceExists) {
      return NextResponse.json(
        { message: `No se encontró un servicio con FK_service: ${FK_service}` },
        { status: 404 }
      );
    }

    // Crear la nueva relación proyecto-servicio
    const newProjectService = await prisma.tbProjectServices.create({
      data: {
        FK_project,
        FK_service,
        status,
      },
    });

    return NextResponse.json(newProjectService, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Ya existe una relación con el mismo proyecto y servicio." },
        { status: 400 }
      );
    }
    return handleError(error, "Error al registrar la relación proyecto-servicio");
  }
}
