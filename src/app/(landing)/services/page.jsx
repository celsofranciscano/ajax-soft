import axios from "axios";

export default async function ServicesPage() {
  const response = await axios.get(`${process.env.API_URL}/api/dashboard/categories`);

  return (
    <section className="">
      <h1 className="text-4xl font-semibold text-center text-white mb-8">Nuestros Servicios</h1>
      
      <p className="text-center text-zinc-300 mb-12">
        En nuestra empresa, nos especializamos en el desarrollo de soluciones web personalizadas. Como desarrolladores de software, ofrecemos una amplia gama de servicios diseñados para optimizar la presencia online de empresas y particulares. Desde la creación de sitios web hasta aplicaciones web complejas, nuestra misión es transformar ideas en soluciones digitales efectivas y fáciles de usar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {response.data.map((category) => (
          <div
            key={category.PK_category}
            className="bg-zinc-900 rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">{category.category}</h2>
            <p className="mb-4">{category.description}</p>
       
          </div>
        ))}
      </div>

      <div className="mt-16 bg-zinc-900 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">¿Por qué elegirnos?</h2>
        <p className="text-zinc-300 mb-6">
          Contamos con un equipo altamente capacitado en desarrollo web, siempre enfocados en ofrecer soluciones innovadoras que se adapten a las necesidades de nuestros clientes. Trabajamos con tecnologías modernas y un enfoque en la escalabilidad, seguridad y rendimiento.
        </p>
        <a
          href="/contacto"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
        >
          Contáctanos
        </a>
      </div>
    </section>
  );
}
