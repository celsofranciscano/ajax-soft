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

// Validar parámetro dinámico `PK_project`
function validatePKProject(PK_project) {
  const id = Number(PK_project);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_project' debe ser un número válido." };
  }
  return { valid: true, id };
}

// Validar cuerpo de la solicitud con reglas
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

// Método GET: Obtener un proyecto específico
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKProject(params.PK_project);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const project = await prisma.tbProjects.findUnique({
      where: { PK_project: id },
      include: {
        tbJobs: {
          select: {
            PK_job: true,
            jobTitle: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: `No se encontró ningún proyecto con PK_project: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener el proyecto");
  }
}

// Método PUT: Actualizar completamente un proyecto
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKProject(params.PK_project);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

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

    const updatedProject = await prisma.tbProjects.update({
      where: { PK_project: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar completamente el proyecto");
  }
}

// Método PATCH: Actualizar parcialmente un proyecto
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKProject(params.PK_project);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      FK_job: { type: "number" },
      projectName: { type: "string", maxLength: 255 },
      description: { type: "string" },
      technologies: { type: "string" },
      results: { type: "string" },
      stages: { type: "string", maxLength: 255 },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedData = validation.validatedData;

    const updatedProject = await prisma.tbProjects.update({
      where: { PK_project: id },
      data: updatedData,
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente el proyecto");
  }
}
