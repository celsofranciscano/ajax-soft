import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const customers = await prisma.tbcustomers.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
 

export async function POST(request) {
  try {
    const { business, firstName, lastName, email, phoneNumber, address } = await request.json();

    console.log("-----*-*-***********************------------------------*******")

    // Validaciones de campos obligatorios
    if (!business || !firstName || !lastName || !email || !phoneNumber || !address) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    // Validación de formato de correo electrónico
    if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(email)) {
      return NextResponse.json(
        { message: "Formato de correo electrónico no válido." },
        { status: 400 }
      );
    }

    // Validación de formato de número de teléfono
    if (!/^\d{8}$/.test(phoneNumber)) {
      return NextResponse.json(
        { message: "El formato del teléfono debe ser: +591 69474456." },
        { status: 400 }
      );
    }

    // Verificar si ya existe un cliente con el mismo email o teléfono
    const existingCustomer = await prisma.tbcustomers.findFirst({
      where: {
        OR: [
          { email: email },
          { phoneNumber: phoneNumber }
        ]
      }
    });

    if (existingCustomer) {
      return NextResponse.json(
        { message: "Ya existe un cliente registrado con este correo electrónico o teléfono." },
        { status: 400 }
      );
    }

    // Crear un nuevo cliente
    const newCustomer = await prisma.tbcustomers.create({
      data: {
        business,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        password: "145265"
      }
    });

    // Retornar respuesta exitosa
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

