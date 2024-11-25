import axios from "axios";

export default async function ProjectsPage() {
  const response = await axios.get(`${process.env.API_URL}/api/dashboard/projects`); // Cambiar la URL a tu endpoint de proyectos

  return (
    <section className="py-12 px-6">
      <h1 className="text-4xl font-semibold text-center text-white mb-8">Nuestros Proyectos</h1>

      <p className="text-center text-zinc-300 mb-12">
        Descubre los proyectos en los que hemos trabajado, demostrando nuestra experiencia en desarrollo de software, 
        innovación tecnológica y compromiso con la excelencia. Cada proyecto refleja nuestro enfoque en soluciones efectivas y escalables.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {response.data.map((project) => (
          <div
            key={project.id}
            className="bg-zinc-900 rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <img src="/project.jpeg" alt="" />
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">{project.name}</h2>
            <div className="flex gap-2 items-center justify-between">

            <p className="mb-2 text-sm text-zinc-400">Estado: <span className="text-zinc-300">{project.status}</span></p>
            <p className="mb-2 text-sm text-zinc-400">Categoría: <span className="text-zinc-300">{project.category}</span></p>
            </div>
            <p className="mb-2 text-sm text-zinc-400">Fase: <span className="text-zinc-300">{project.stage}</span></p>
            <p className="text-zinc-300">{project.description}</p>
          </div>
        ))}
      </div>

    
    </section>
  );
}
