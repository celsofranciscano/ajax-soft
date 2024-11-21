import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request, { params }) {
  try {
    console.log("[INFO] Iniciando solicitud GET para obtener un rol específico...");

    // Validar que PK_role sea un número válido
    const PK_role = Number(params.PK_role);
    if (isNaN(PK_role) || PK_role <= 0) {
      return NextResponse.json(
        { success: false, message: "El parámetro 'PK_role' debe ser un número válido" },
        { status: 400 }
      );
    }

    // Buscar el rol en la base de datos
    const role = await prisma.tbroles.findUnique({
      where: { PK_role },
    });

    if (!role) {
      return NextResponse.json(
        { success: false, message: `No se encontró ningún rol con PK_role: ${PK_role}` },
        { status: 404 }
      );
    }

    console.log("[SUCCESS] Rol encontrado:", role);
    return NextResponse.json(
      { success: true, data: role },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ERROR] Error al obtener el rol:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener el rol", error: error.message },
      { status: 500 }
    );
  }
}
