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

// Método GET: Obtener todas las tareas
export async function GET() {
  try {
    const tasks = await prisma.tbTasks.findMany({
      select: {
        PK_task: true,
        FK_project: true,
        description: true,
        timeExpected: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tbProjects: {
          select: {
            PK_project: true,
            projectName: true,
          },
        },
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener las tareas");
  }
}

// Método POST: Crear una nueva tarea
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      FK_project: { required: true, type: "number" },
      description: { required: true, type: "string" },
      timeExpected: { required: true, type: "string", maxLength: 50 },
      status: { required: true, type: "string", maxLength: 20 },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const { FK_project, description, timeExpected, status } = validation.validatedData;

    // Verificar si el proyecto asociado existe
    const projectExists = await prisma.tbProjects.findUnique({
      where: { PK_project: FK_project },
    });

    if (!projectExists) {
      return NextResponse.json(
        { message: `No se encontró un proyecto con FK_project: ${FK_project}` },
        { status: 404 }
      );
    }

    // Crear la nueva tarea
    const newTask = await prisma.tbTasks.create({
      data: {
        FK_project,
        description,
        timeExpected,
        status,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Ya existe una tarea con la misma descripción en este proyecto." },
        { status: 400 }
      );
    }
    return handleError(error, "Error al registrar la tarea");
  }
}
