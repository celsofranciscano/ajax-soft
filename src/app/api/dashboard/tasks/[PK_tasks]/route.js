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

// Validar parámetro dinámico `PK_task`
function validatePKTask(PK_task) {
  const id = Number(PK_task);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_task' debe ser un número válido." };
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

// Método GET: Obtener una tarea específica
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKTask(params.PK_task);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const task = await prisma.tbTasks.findUnique({
      where: { PK_task: id },
      include: {
        tbProjects: {
          select: {
            PK_project: true,
            projectName: true,
          },
        },
      },
    });

    if (!task) {
      return NextResponse.json(
        { message: `No se encontró ninguna tarea con PK_task: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener la tarea");
  }
}

// Método PUT: Actualizar completamente una tarea
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKTask(params.PK_task);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

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

    const updatedTask = await prisma.tbTasks.update({
      where: { PK_task: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar completamente la tarea");
  }
}

// Método PATCH: Actualizar parcialmente una tarea
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKTask(params.PK_task);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas flexibles
    const validation = validateRequestBody(body, {
      FK_project: { type: "number" },
      description: { type: "string" },
      timeExpected: { type: "string", maxLength: 50 },
      status: { type: "string", maxLength: 20 },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedData = validation.validatedData;

    const updatedTask = await prisma.tbTasks.update({
      where: { PK_task: id },
      data: updatedData,
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente la tarea");
  }
}
