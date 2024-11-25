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

// Método GET: Obtener todos los proyectos
export async function GET() {
  try {
    const projects = await prisma.tbProjects.findMany({
      select: {
        PK_project: true,
        FK_job: true,
        projectName: true,
        description: true,
        technologies: true,
        results: true,
        stages: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tbJobs: {
          select: {
            PK_job: true,
            jobTitle: true,
          },
        },
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener los proyectos");
  }
}

// Método POST: Crear un nuevo proyecto
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      FK_job: { required: true, type: "number" },
      projectName: { required: true, type: "string", maxLength: 255 },
      description: { required: true, type: "string" },
      technologies: { required: true, type: "string" },
      results: { required: true, type: "string" },
      stages: { required: true, type: "string", maxLength: 255 },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const {
      FK_job,
      projectName,
      description,
      technologies,
      results,
      stages,
      status,
    } = validation.validatedData;

    // Verificar si el trabajo asociado existe
    const jobExists = await prisma.tbJobs.findUnique({
      where: { PK_job: FK_job },
    });

    if (!jobExists) {
      return NextResponse.json(
        { message: `No se encontró un trabajo con FK_job: ${FK_job}` },
        { status: 404 }
      );
    }

    // Crear el nuevo proyecto
    const newProject = await prisma.tbProjects.create({
      data: {
        FK_job,
        projectName,
        description,
        technologies,
        results,
        stages,
        status,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return handleError(error, "Error al registrar el proyecto");
  }
}
