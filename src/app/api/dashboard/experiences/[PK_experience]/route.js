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

// Validar parámetro dinámico PK_experience
function validatePKExperience(PK_experience) {
  const id = Number(PK_experience);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "El parámetro 'PK_experience' debe ser un número válido." };
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

// Método GET: Obtener una experiencia específica
export async function GET(request, { params }) {
  try {
    const { valid, id, error } = validatePKExperience(params.PK_experience);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const experience = await prisma.tbExperiences.findUnique({
      where: { PK_experience: id },
      include: {
        tbUsers: {
          select: {
            username: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!experience) {
      return NextResponse.json(
        { message: `No se encontró ninguna experiencia con PK_experience: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(experience, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener la experiencia");
  }
}

// Método PUT: Actualizar completamente una experiencia
export async function PUT(request, { params }) {
  try {
    const { valid, id, error } = validatePKExperience(params.PK_experience);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      FK_user: { required: true, type: "number" },
      roleAssignet: { required: true, type: "string", maxLength: 10 },
      initialDate: { required: true, type: "string" }, // Se espera formato ISO
      finalDate: { required: true, type: "string" }, // Se espera formato ISO
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const { FK_user, roleAssignet, initialDate, finalDate, status } = validation.validatedData;

    const updatedExperience = await prisma.tbExperiences.update({
      where: { PK_experience: id },
      data: {
        FK_user,
        roleAssignet,
        initialDate: new Date(initialDate),
        finalDate: new Date(finalDate),
        status,
      },
    });

    return NextResponse.json(updatedExperience, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar completamente la experiencia");
  }
}

// Método PATCH: Actualizar parcialmente una experiencia
export async function PATCH(request, { params }) {
  try {
    const { valid, id, error } = validatePKExperience(params.PK_experience);
    if (!valid) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    const body = await request.json();

    const validation = validateRequestBody(body, {
      FK_user: { type: "number" },
      roleAssignet: { type: "string", maxLength: 10 },
      initialDate: { type: "string" }, // Se espera formato ISO
      finalDate: { type: "string" }, // Se espera formato ISO
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedExperience = await prisma.tbExperiences.update({
      where: { PK_experience: id },
      data: {
        ...validation.validatedData,
        initialDate: validation.validatedData.initialDate
          ? new Date(validation.validatedData.initialDate)
          : undefined,
        finalDate: validation.validatedData.finalDate
          ? new Date(validation.validatedData.finalDate)
          : undefined,
      },
    });

    return NextResponse.json(updatedExperience, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al actualizar parcialmente la experiencia");
  }
}
