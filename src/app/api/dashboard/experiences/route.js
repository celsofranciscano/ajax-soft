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

// Método GET: Obtener todas las experiencias
export async function GET() {
  try {
    const experiences = await prisma.tbExperiences.findMany({
      select: {
        PK_experience: true,
        FK_user: true,
        roleAssignet: true,
        initialDate: true,
        finalDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
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

    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener las experiencias");
  }
}

// Método POST: Crear una nueva experiencia
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      FK_user: { required: true, type: "number" },
      roleAssignet: { required: true, type: "string", maxLength: 10 },
      initialDate: { required: true, type: "string" }, // Se espera una fecha en formato ISO
      finalDate: { required: true, type: "string" }, // Se espera una fecha en formato ISO
      status: { required: true, type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const { FK_user, roleAssignet, initialDate, finalDate, status } = validation.validatedData;

    // Verificar si el usuario asociado existe
    const userExists = await prisma.tbUsers.findUnique({
      where: { PK_user: FK_user },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: `No se encontró un usuario con FK_user: ${FK_user}` },
        { status: 404 }
      );
    }

    // Crear la nueva experiencia
    const newExperience = await prisma.tbExperiences.create({
      data: {
        FK_user,
        roleAssignet,
        initialDate: new Date(initialDate),
        finalDate: new Date(finalDate),
        status,
      },
    });

    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "La experiencia ya está registrada." },
        { status: 400 }
      );
    }
    return handleError(error, "Error al registrar la experiencia");
  }
}
