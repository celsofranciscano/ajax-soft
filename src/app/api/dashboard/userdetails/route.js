import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// Función para manejar errores centralizados
function handleError(error, message = "Error interno del servidor", status = 500) {
  if (error.code === "P2025") {
    return NextResponse.json({ message: "Registro no encontrado" }, { status: 404 });
  }
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

      if (rule.minLength && value.length < rule.minLength) {
        errors.push(`El campo '${field}' debe tener al menos ${rule.minLength} caracteres.`);
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

// Método GET: Obtener todos los detalles de usuario
export async function GET() {
  try {
    const userDetails = await prisma.tbuserdetails.findMany({
      select: {
        PK_detail: true,
        FK_user: true,
        phoneNumber: true,
        address: true,
        dateOfBirth: true,
        hireDate: true,
        position: true,
        salary: true,
        status: true,
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

    return NextResponse.json(userDetails, { status: 200 });
  } catch (error) {
    return handleError(error, "Error al obtener los detalles de usuario");
  }
}

// Método POST: Crear un nuevo detalle de usuario
export async function POST(request) {
  try {
    const body = await request.json();

    // Validar cuerpo con reglas
    const validation = validateRequestBody(body, {
      FK_user: { required: true, type: "number" },
      phoneNumber: { type: "string", maxLength: 15 },
      address: { type: "string", maxLength: 255 },
      dateOfBirth: { type: "string", regex: /^\d{4}-\d{2}-\d{2}$/ }, // YYYY-MM-DD
      hireDate: { type: "string", regex: /^\d{4}-\d{2}-\d{2}$/ }, // YYYY-MM-DD
      position: { type: "string", maxLength: 80 },
      salary: { required: true, type: "string", maxLength: 30 },
      status: { type: "boolean" },
    });

    if (!validation.valid) {
      return NextResponse.json(
        { message: "Errores de validación", errors: validation.errors },
        { status: 400 }
      );
    }

    const {
      FK_user,
      phoneNumber,
      address,
      dateOfBirth,
      hireDate,
      position,
      salary,
      status,
    } = validation.validatedData;

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

    // Verificar si ya existe un detalle para el usuario
    const detailExists = await prisma.tbuserdetails.findUnique({
      where: { FK_user },
    });

    if (detailExists) {
      return NextResponse.json(
        { message: `Ya existe un detalle para el usuario con FK_user: ${FK_user}` },
        { status: 400 }
      );
    }

    // Crear el nuevo detalle de usuario
    const newUserDetail = await prisma.tbuserdetails.create({
      data: {
        FK_user,
        phoneNumber,
        address,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        hireDate: hireDate ? new Date(hireDate) : null,
        position,
        salary,
        status: status ?? true, // Si no se especifica, por defecto será `true`
      },
    });

    return NextResponse.json(newUserDetail, { status: 201 });
  } catch (error) {
    return handleError(error, "Error al registrar el detalle del usuario");
  }
}
