import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    // Realizar la consulta con los joins usando `include`
    const projects = await prisma.tbprojects.findMany({
      include: {
        tbstatus: true,        // Incluye el status del proyecto
        tbcustomers: true,     // Incluye los detalles del cliente
        tbcategories: true,    // Incluye la categoría del proyecto
        tbstages: true,        // Incluye las etapas del proyecto
      },
    });

    // Retorna la respuesta con los proyectos y sus relaciones
    return NextResponse.json(projects);
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
