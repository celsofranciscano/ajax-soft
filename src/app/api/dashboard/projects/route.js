import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET() {
  try {
    // Consulta con relaciones
    const projects = await prisma.tbprojects.findMany({
      include: {
        tbstatus: true,
        tbcategories: true,
        tbstages: true,
        tbprojectdetails: true,
      },
    });

    // Formatear los datos en un único nivel
    const formattedProjects = projects.map((project) => {
      const details = project.tbprojectdetails[0] || {}; // Asumimos que puede haber un único detalle por proyecto

      return {
        id: project.PK_project,             // ID del proyecto
        name: project.project,              // Nombre del proyecto
        description: project.description,   // Descripción del proyecto
        image: project.image,               // Imagen del proyecto
        createdAt: project.createdAt,       // Fecha de creación
        updatedAt: project.updatedAt,       // Última fecha de actualización
        status: project.tbstatus?.status || "Sin estado", // Estado del proyecto
        category: project.tbcategories?.category || "Sin categoría", // Categoría
        stage: project.tbstages?.stage || "Sin fase", // Etapa o fase
        startDate: details.startDate || null,      // Fecha de inicio
        endDate: details.endDate || null,          // Fecha de finalización
        deploymentUrl: details.deploymentUrl || null, // URL de despliegue
        cost: details.cost || null,                // Costo estimado
        estimatedTime: details.estimatedTime || null, // Tiempo estimado
        githubUrl: details.githubUrl || null,      // URL de GitHub
        notionUrl: details.notionUrl || null,      // URL de Notion
        figmaUrl: details.figmaUrl || null,        // URL de Figma
      };
    });

    // Retornar la respuesta con los proyectos formateados
    return NextResponse.json(formattedProjects);
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
