
import prisma from "@/connection/db";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    console.log("Iniciando solicitud GET para roles...");

    const roles = await prisma.tbroles.findMany();
    console.log("Roles obtenidos exitosamente:", roles);

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error en el método GET para roles:", error.message);
    return NextResponse.json({ error: "Error al obtener los roles" }, { status: 500 });
  }
}
