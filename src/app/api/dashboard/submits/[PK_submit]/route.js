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

// Validar parámetro PK_submit
function validatePKSubmit(PK_submit) {
  const id = Number(PK_submit);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_submit' debe ser un número válido." };
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

// Método GET: Obtener una postulación específica
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKSubmit(params.PK_submit);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const submit = await prisma.tbsubmits.findUnique({
      where: { PK_submit: id },
      include: {
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

    if (!submit) {
      return NextResponse.json(
        { message: `No se encontró ninguna postulación con PK_submit: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(submit, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener la postulación");
  }
}

// Método PUT: Actualizar completamente una postulación
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKSubmit(params.PK_submit);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      FK_user: { required: true, type: "number" },
      FK_job: { required: true, type: "number" },
      submitDate: { required: true, type: "string", regex: /^\d{4}-\d{2}-\d{2}$/ },
      status: { required: true, type: "string", maxLength: 20 },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedSubmit = await prisma.tbsubmits.update({
      where: { PK_submit: id },
      data: {
        ...validation.validatedData,
        submitDate: new Date(validation.validatedData.submitDate),
      },
    });

    return NextResponse.json(updatedSubmit, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar completamente la postulación");
  }
}

// Método PATCH: Actualizar parcialmente una postulación
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKSubmit(params.PK_submit);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      FK_user: { type: "number" },
      FK_job: { type: "number" },
      submitDate: { type: "string", regex: /^\d{4}-\d{2}-\d{2}$/ },
      status: { type: "string", maxLength: 20 },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const dataToUpdate = {
      ...validation.validatedData,
      submitDate: validation.validatedData.submitDate
        ? new Date(validation.validatedData.submitDate)
        : undefined,
    };

    const updatedSubmit = await prisma.tbsubmits.update({
      where: { PK_submit: id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedSubmit, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente la postulación");
  }
}