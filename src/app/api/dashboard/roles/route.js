import { NextResponse } from "next/server";
import prisma from "@/libs/db";

// Helper para manejar errores
function handleError(error, message = "Error interno del servidor", status = 500) {
  console.error(`[ERROR] ${message}`, error); // Log detallado del error
  return NextResponse.json(
    {
      success: false,
      message,
      error: error.message || "Error desconocido",
    },
    { status }
  );
}

// Middleware para validar el cuerpo de la solicitud
async function validateRequestBody(request, requiredFields) {
  try {
    const body = await request.json();
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return {
        valid: false,
        error: `Faltan los campos requeridos: ${missingFields.join(", ")}`,
      };
    }

    return { valid: true, body };
  } catch (error) {
    return {
      valid: false,
      error: "Cuerpo de la solicitud no es válido JSON o está vacío",
    };
  }
}

export async function GET() {
    try {
      console.log("[INFO] Iniciando solicitud GET para obtener roles...");
  
      const roles = await prisma.tbroles.findMany({
        orderBy: { createdAt: "desc" },
      });
  
      console.log("[DEBUG] Datos obtenidos de la base de datos:", roles);
  
      return NextResponse.json(
        { success: true, data: roles },
        { status: 200 }
      );
    } catch (error) {
      console.error("[ERROR] Error al obtener roles:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Error al obtener los roles",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }
  

  export async function POST(request) {
    try {
      console.log("[INFO] Iniciando solicitud POST para crear un nuevo rol...");
  
      const { role } = await request.json();
  
      if (!role || typeof role !== "string") {
        return NextResponse.json(
          { success: false, message: "El campo 'role' es obligatorio y debe ser una cadena de texto" },
          { status: 400 }
        );
      }
  
      const roleExists = await prisma.tbroles.findUnique({
        where: { role },
      });
  
      if (roleExists) {
        return NextResponse.json(
          { success: false, message: `El rol '${role}' ya existe` },
          { status: 400 }
        );
      }
  
      const newRole = await prisma.tbroles.create({
        data: { role },
      });
  
      console.log("[SUCCESS] Rol creado exitosamente en la base de datos:", newRole);
  
      return NextResponse.json(
        { success: true, data: newRole },
        { status: 201 }
      );
    } catch (error) {
      console.error("[ERROR] Error al crear el rol:", error);
      return NextResponse.json(
        { success: false, message: "Error al crear el rol", error: error.message },
        { status: 500 }
      );
    }
  }
