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

      if (rule.regex && !rule.regex.test(value)) {
        errors.push(`El campo '${field}' tiene un formato inválido.`);
        continue;
      }
    }

    validatedData[field] = value;
  }

  return { valid: errors.length === 0, errors, validatedData };
}

// Método GET: Obtener todos los trabajos
export async function GET() {
  try {
    const jobs = await prisma.tbJobs.findMany({
      select: {
        PK_job: true,
        FK_company: true,
        jobTitle: true,
        jobDescription: true,
        jobRequirements: true,
        locationIrl: true,
        salary: true,
        closeDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tbcompanies: {
          select: {
            companyName: true,
          },
        },
      },
    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener los trabajos");
  }
}

// Método POST: Crear un nuevo trabajo
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      FK_company: { required: true, type: "number" },
      jobTitle: { required: true, type: "string", maxLength: 100 },
      jobDescription: { required: true, type: "string", maxLength: 500 },
      jobRequirements: { required: true, type: "string", maxLength: 500 },
      locationIrl: { required: true, type: "string", maxLength: 100 },
      salary: { required: true, type: "number" },
      closeDate: { required: true, type: "string", regex: /^\d{4}-\d{2}-\d{2}$/ }, // YYYY-MM-DD
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const {
      FK_company,
      jobTitle,
      jobDescription,
      jobRequirements,
      locationIrl,
      salary,
      closeDate,
      status,
    } = validation.validatedData;

    // Verificar si la compañía existe
    const companyExists = await prisma.tbcompanies.findUnique({
      where: { PK_company: FK_company },
    });

    if (!companyExists) {
      return NextResponse.json(
        { message: `No se encontró una compañía con FK_company: ${FK_company}` },
        { status: 404 }
      );
    }

    // Crear el nuevo trabajo
    const newJob = await prisma.tbJobs.create({
      data: {
        FK_company,
        jobTitle,
        jobDescription,
        jobRequirements,
        locationIrl,
        salary: parseFloat(salary), // Convertir salario a número decimal
        closeDate: new Date(closeDate),
        status,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return handleError(error, "Error al registrar el trabajo");
  }
}
