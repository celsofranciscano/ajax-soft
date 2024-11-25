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

// Método GET: Obtener todas las compañías
export async function GET() {
  try {
    const companies = await prisma.tbcompanies.findMany({
      select: {
        PK_company: true,
        companyName: true,
        industry: true,
        address: true,
        website: true,
        category: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener las compañías");
  }
}

// Método POST: Crear una nueva compañía
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
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

    const {
      companyName,
      industry,
      address,
      website,
      category,
      description,
      status,
    } = validation.validatedData;

    // Crear la nueva compañía
    const newCompany = await prisma.tbcompanies.create({
      data: {
        companyName,
        industry,
        address,
        website,
        category,
        description,
        status,
      },
    });

    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "El nombre de la compañía ya está registrado." },
        { status: 400 }
      );
    }
    return handleError(error, "Error al registrar la compañía");
  }
}
