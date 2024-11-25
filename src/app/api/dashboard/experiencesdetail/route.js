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

// Método GET: Obtener todos los detalles de experiencia
export async function GET() {
  try {
    const experienceDetails = await prisma.tbExperienceDetail.findMany({
      select: {
        PK_experienceDetail: true,
        FK_experience: true,
        personalAchievements: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tbExperiences: {
          select: {
            PK_experience: true,
            FK_user: true,
            roleAssignet: true,
          },
        },
      },
    });

    return NextResponse.json(experienceDetails, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener los detalles de experiencia");
  }
}

// Método POST: Crear un nuevo detalle de experiencia
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
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

    const { FK_experience, personalAchievements, status } = validation.validatedData;

    // Verificar si la experiencia asociada existe
    const experienceExists = await prisma.tbExperiences.findUnique({
      where: { PK_experience: FK_experience },
    });

    if (!experienceExists) {
      return NextResponse.json(
        { message: `No se encontró una experiencia con FK_experience: ${FK_experience}` },
        { status: 404 }
      );
    }

    // Crear el nuevo detalle de experiencia
    const newExperienceDetail = await prisma.tbExperienceDetail.create({
      data: {
        FK_experience,
        personalAchievements,
        status,
      },
    });

    return NextResponse.json(newExperienceDetail, { status: 201 });
  } catch (error) {
    return handleError(error, "Error al registrar el detalle de experiencia");
  }
}
