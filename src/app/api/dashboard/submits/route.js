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

// Método GET: Obtener todas las postulaciones
export async function GET() {
  try {
    const submits = await prisma.tbsubmits.findMany({
      select: {
        PK_submit: true,
        FK_user: true,
        FK_job: true,
        submitDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tbUsers: {
          select: {
            PK_user: true,
            firstName: true,
            lastName: true,
          },
        },
        tbJobs: {
          select: {
            PK_job: true,
            jobTitle: true,
          },
        },
      },
    });

    return NextResponse.json(submits, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener las postulaciones");
  }
}

// Método POST: Crear una nueva postulación
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      FK_user: { required: true, type: "number" },
      FK_job: { required: true, type: "number" },
      submitDate: { required: true, type: "string", regex: /^\d{4}-\d{2}-\d{2}$/ },
      status: { required: false, type: "string", maxLength: 20 },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const { FK_user, FK_job, submitDate, status } = validation.validatedData;

    // Verificar si el usuario existe
    const userExists = await prisma.tbUsers.findUnique({
      where: { PK_user: FK_user },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: `No se encontró un usuario con FK_user: ${FK_user}` },
        { status: 404 }
      );
    }

    // Verificar si el trabajo existe
    const jobExists = await prisma.tbJobs.findUnique({
      where: { PK_job: FK_job },
    });

    if (!jobExists) {
      return NextResponse.json(
        { message: `No se encontró un trabajo con FK_job: ${FK_job}` },
        { status: 404 }
      );
    }

    // Crear la nueva postulación
    const newSubmit = await prisma.tbsubmits.create({
      data: {
        FK_user,
        FK_job,
        submitDate: new Date(submitDate),
        status: status ?? "En revisión", // Valor por defecto si no se especifica
      },
    });

    return NextResponse.json(newSubmit, { status: 201 });
  } catch (error) {
    return handleError(error, "Error al registrar la postulación");
  }
}
