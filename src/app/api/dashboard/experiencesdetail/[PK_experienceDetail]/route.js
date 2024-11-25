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

// Validar parámetro de PK_experienceDetail
function validatePKExperienceDetail(PK_experienceDetail) {
  const id = Number(PK_experienceDetail);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_experienceDetail' debe ser un número válido." };
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

// Método GET: Obtener un detalle de experiencia específico
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKExperienceDetail(params.PK_experienceDetail);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const experienceDetail = await prisma.tbExperienceDetail.findUnique({
      where: { PK_experienceDetail: id },
      include: {
        tbExperiences: {
          select: {
            PK_experience: true,
            FK_user: true,
            roleAssignet: true,
          },
        },
      },
    });

    if (!experienceDetail) {
      return NextResponse.json(
        { message: `No se encontró un detalle de experiencia con PK_experienceDetail: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(experienceDetail, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener el detalle de experiencia");
  }
}

// Método PUT: Actualizar completamente un detalle de experiencia
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKExperienceDetail(params.PK_experienceDetail);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      FK_experience: { required: true, type: "number" },
      personalAchievements: { required: true, type: "string", maxLength: 200 },
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedExperienceDetail = await prisma.tbExperienceDetail.update({
      where: { PK_experienceDetail: id },
      data: validation.validatedData,
    });

    return NextResponse.json(updatedExperienceDetail, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar completamente el detalle de experiencia");
  }
}

// Método PATCH: Actualizar parcialmente un detalle de experiencia
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKExperienceDetail(params.PK_experienceDetail);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      FK_experience: { type: "number" },
      personalAchievements: { type: "string", maxLength: 200 },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedData = validation.validatedData;

    const updatedExperienceDetail = await prisma.tbExperienceDetail.update({
      where: { PK_experienceDetail: id },
      data: updatedData,
    });

    return NextResponse.json(updatedExperienceDetail, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente el detalle de experiencia");
  }
}
