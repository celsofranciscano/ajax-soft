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

// Validar parámetro PK_job
function validatePKJob(PK_job) {
  const id = Number(PK_job);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_job' debe ser un número válido." };
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

      if (rule.regex && !rule.regex.test(value)) {
        errors.push(`El campo '${field}' tiene un formato inválido.`);
        continue;
      }
    }

    validatedData[field] = value;
  }

  return { valid: errors.length === 0, errors, validatedData };
}

// Método GET: Obtener un trabajo específico
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKJob(params.PK_job);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const job = await prisma.tbJobs.findUnique({
      where: { PK_job: id },
      include: {
        tbcompanies: {
          select: {
            PK_company: true,
            companyName: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: `No se encontró un trabajo con PK_job: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener el trabajo");
  }
}

// Método PUT: Actualizar completamente un trabajo
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKJob(params.PK_job);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      FK_company: { required: true, type: "number" },
      jobTitle: { required: true, type: "string", maxLength: 100 },
      jobDescription: { required: true, type: "string", maxLength: 500 },
      jobRequirements: { required: true, type: "string", maxLength: 500 },
      locationIrl: { required: true, type: "string", maxLength: 100 },
      salary: { required: true, type: "number" },
      closeDate: { required: true, type: "string", regex: /^\d{4}-\d{2}-\d{2}$/ },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedJob = await prisma.tbJobs.update({
      where: { PK_job: id },
      data: {
        ...validation.validatedData,
        closeDate: new Date(validation.validatedData.closeDate),
        salary: parseFloat(validation.validatedData.salary),
      },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar el trabajo");
  }
}

// Método PATCH: Actualizar parcialmente un trabajo
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKJob(params.PK_job);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    // Validar cuerpo con reglas flexibles
    const validation = validateRequestBody(body, {
      FK_company: { type: "number" },
      jobTitle: { type: "string", maxLength: 100 },
      jobDescription: { type: "string", maxLength: 500 },
      jobRequirements: { type: "string", maxLength: 500 },
      locationIrl: { type: "string", maxLength: 100 },
      salary: { type: "number" },
      closeDate: { type: "string", regex: /^\d{4}-\d{2}-\d{2}$/ },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const dataToUpdate = {
      ...validation.validatedData,
      closeDate: validation.validatedData.closeDate
        ? new Date(validation.validatedData.closeDate)
        : undefined,
      salary: validation.validatedData.salary
        ? parseFloat(validation.validatedData.salary)
        : undefined,
    };

    const updatedJob = await prisma.tbJobs.update({
      where: { PK_job: id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente el trabajo");
  }
}
