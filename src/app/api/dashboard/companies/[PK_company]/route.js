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

// Validar parámetro dinámico PK_company
function validatePKCompany(PK_company) {
  const id = Number(PK_company);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_company' debe ser un número válido." };
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

// Método GET: Obtener una compañía específica
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKCompany(params.PK_company);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const company = await prisma.tbcompanies.findUnique({
      where: { PK_company: id },
    });

    if (!company) {
      return NextResponse.json(
        { message: `No se encontró ninguna compañía con PK_company: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener la compañía");
  }
}

// Método PUT: Actualizar completamente una compañía
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKCompany(params.PK_company);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      companyName: { required: true, type: "string", maxLength: 100 },
      industry: { required: true, type: "string", maxLength: 50 },
      address: { required: true, type: "string", maxLength: 100 },
      website: { required: true, type: "string", maxLength: 100 },
      category: { required: true, type: "string", maxLength: 20 },
      description: { required: true, type: "string", maxLength: 500 },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedCompany = await prisma.tbcompanies.update({
      where: { PK_company: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedCompany, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar completamente la compañía");
  }
}

// Método PATCH: Actualizar parcialmente una compañía
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKCompany(params.PK_company);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      companyName: { type: "string", maxLength: 100 },
      industry: { type: "string", maxLength: 50 },
      address: { type: "string", maxLength: 100 },
      website: { type: "string", maxLength: 100 },
      category: { type: "string", maxLength: 20 },
      description: { type: "string", maxLength: 500 },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedCompany = await prisma.tbcompanies.update({
      where: { PK_company: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedCompany, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente la compañía");
  }
}
