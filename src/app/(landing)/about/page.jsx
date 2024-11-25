function AboutPage() {
    return (
      <main className="grid gap-16">
        {/* Sección de encabezado profesional */}
        <section
          className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url('/header-image.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-extrabold tracking-tight">Sobre Nosotros</h1>
            <p className="mt-4 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              Conectamos a los mejores talentos con las principales organizaciones del mundo,
              creando un impacto tangible a través de innovación y excelencia.
            </p>
          </div>
        </section>
  
        {/* Navegación por secciones */}
        <nav className="flex justify-center gap-12 border-b pb-4">
          {["Equipo Ejecutivo", "Líderes Ejecutivos", "Estadísticas", "Impacto"].map((section, index) => (
            <a
              key={index}
              href={`#section-${index}`}
              className="text-lg font-medium text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 tracking-wide transition"
            >
              {section}
            </a>
          ))}
        </nav>
  
  {/* Sección: Equipo Ejecutivo */}
<section id="section-0" className="px-8 md:px-16">
  <h2 className="text-3xl font-bold text-center mb-12 tracking-tight text-gray-800 dark:text-white">
    Nuestro Equipo Ejecutivo
  </h2>
  <div className="grid md:grid-cols-3 gap-12">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
      >
        <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-800">
          {/* Reemplazo de la imagen con la URL especificada */}
          <img
            src="https://avatars.githubusercontent.com/u/162634097?v=4"
            alt={`Ejecutivo ${i + 1}`}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Nombre del Ejecutivo {i + 1}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Puesto {i + 1}</p>
          <a
            href="https://avatars.githubusercontent.com/u/162634097?v=4"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-green-600 hover:text-green-500 font-medium transition"
          >
            Ver bio →
          </a>
        </div>
      </div>
    ))}
  </div>
</section>

        {/* Sección: Líderes Ejecutivos */}
        <section id="section-1" className="bg-gray-50 dark:bg-zinc-950 py-16 px-8 md:px-16">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight text-gray-800 dark:text-white">
            Líderes Ejecutivos de Negocios
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-800">
                  <img
                    src={`/leader-placeholder-${i + 1}.jpg`}
                    alt="Líder"
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Nombre del Líder
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Puesto</p>
                  <a
                    href="#"
                    className="mt-4 inline-block text-green-600 hover:text-green-500 font-medium transition"
                  >
                    Ver bio →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Sección: Carreras */}
        <section className="bg-green-600 dark:bg-green-800 py-16 px-8 md:px-16 text-center">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Únete a Nuestro Equipo
          </h2>
          <p className="mt-4 mb-6 text-lg md:text-xl text-green-200 max-w-3xl mx-auto leading-relaxed">
            Sé parte de un equipo global dedicado a la innovación, el impacto y el crecimiento profesional.
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-white text-green-600 font-semibold py-3 px-6 rounded-md shadow hover:bg-gray-100 transition"
          >
            Explora Oportunidades →
          </a>
        </section>
  

            {/* Sección: Estadísticas */}
<section id="statistics" className="bg-gray-50 dark:bg-zinc-950 py-16 px-8 md:px-16">
  <h2 className="text-3xl font-bold text-center mb-12 tracking-tight text-gray-800 dark:text-white">
    Estadísticas y Cifras
  </h2>

  {/* Gráfico de barras verticales */}
  <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-8 mb-12">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 text-center">
      Aplicaciones de Talento Recibidas
    </h3>
    <div className="grid grid-cols-5 gap-4">
      {[
        { year: "2016", value: "100,000+" },
        { year: "2018", value: "500,000+" },
        { year: "2020", value: "750,000+" },
        { year: "2022", value: "2,200,000+" },
        { year: "2023", value: "2,700,000+" },
      ].map((data, i) => (
        <div key={i} className="text-center">
          <div className="relative h-32 w-full">
            <div
              className="absolute bottom-0 left-0 w-full bg-green-600 rounded-md"
              style={{ height: `${(i + 1) * 20}px` }}
            ></div>
          </div>
          <p className="text-green-600 font-bold">{data.value}</p>
          <p className="text-gray-600 dark:text-gray-400">{data.year}</p>
        </div>
      ))}
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">Datos acumulativos</p>
  </div>

  {/* Gráfico de barras horizontales */}
  <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-8 mb-12">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 text-center">
      Crecimiento en Contrataciones
    </h3>
    <div className="flex flex-col space-y-4">
      {[
        { year: "2017", value: "15,000" },
        { year: "2019", value: "35,000" },
        { year: "2021", value: "50,000" },
        { year: "2023", value: "80,000" },
      ].map((data, i) => (
        <div key={i} className="flex items-center">
          <p className="w-16 text-gray-600 dark:text-gray-400">{data.year}</p>
          <div
            className="h-4 bg-green-600 rounded-md"
            style={{ width: `${(i + 1) * 25}%` }}
          ></div>
          <p className="ml-4 text-green-600 font-bold">{data.value}</p>
        </div>
      ))}
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Datos anuales</p>
  </div>

  {/* Gráfico de pie */}
  <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-8 mb-12">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 text-center">
      Distribución de Talento por Industria
    </h3>
    <div className="relative h-64 flex justify-center items-center">
      <div className="w-48 h-48 relative">
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <circle
            r="16"
            cx="16"
            cy="16"
            className="text-gray-300"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="32"
          />
          <circle
            r="16"
            cx="16"
            cy="16"
            className="text-green-600"
            fill="transparent"
            strokeDasharray="60 40"
            strokeDashoffset="25"
            strokeWidth="32"
            transform="rotate(-90 16 16)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
            60% Tecnología<br />40% Otras
          </p>
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">Datos de 2023</p>
  </div>

  {/* Línea de tiempo */}
  <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-8">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 text-center">
      Evolución Anual de Talento Contratado
    </h3>
    <div className="relative h-64">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          
          points="0,30 20,20 40,10 60,15 80,5 100,10"
        />
      </svg>
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">Datos proyectados</p>
  </div>
</section>

        {/* Sección: Iniciativas */}
<section id="impact-initiatives" className="bg-gray-50 dark:bg-zinc-950 py-16 px-8 md:px-16">
  <h2 className="text-3xl font-bold text-center mb-12 tracking-tight text-gray-800 dark:text-white">
    Iniciativas de Impacto
  </h2>
  <div className="grid gap-12">
    {/* Primera iniciativa */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <img
        src="/volunteer.jpg"
        alt="TopVolunteer"
        className="rounded-lg shadow-md w-full object-cover h-64 md:h-80 transition-transform duration-300 hover:scale-105"
      />
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">TopVolunteer™</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Aprovechamos el poder de la Red Toptal para conectar a las ONG globales con los mejores talentos.
          Esta iniciativa ha ayudado a más de 100 organizaciones sin fines de lucro a ejecutar proyectos que impactan 
          directamente a comunidades en necesidad.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Los voluntarios participantes son expertos en diversas disciplinas, desde desarrollo de software hasta marketing digital,
          garantizando resultados excepcionales para cada proyecto.
        </p>
        <a
          href="#"
          className="text-green-600 hover:text-green-500 font-medium transition"
        >
          Obtenga más información →
        </a>
      </div>
    </div>

    {/* Segunda iniciativa */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Global Talent Outreach</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Nuestra iniciativa Global Talent Outreach busca identificar y empoderar a profesionales talentosos de
          todo el mundo, especialmente en regiones subrepresentadas, proporcionando recursos, formación y oportunidades.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Este programa ha sido implementado en más de 50 países, ayudando a cerrar la brecha de acceso al talento global y 
          permitiendo que miles de profesionales se conecten con proyectos internacionales de alto impacto.
        </p>
        <a
          href="#"
          className="text-green-600 hover:text-green-500 font-medium transition"
        >
          Descubra cómo puede unirse →
        </a>
      </div>
      <img
        src="/outreach.jpg"
        alt="Global Talent Outreach"
        className="rounded-lg shadow-md w-full object-cover h-64 md:h-80 transition-transform duration-300 hover:scale-105"
      />
    </div>

    {/* Tercera iniciativa */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <img
        src="/green-initiatives.jpg"
        alt="Green Initiatives"
        className="rounded-lg shadow-md w-full object-cover h-64 md:h-80 transition-transform duration-300 hover:scale-105"
      />
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Green Initiatives</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Como parte de nuestro compromiso con la sostenibilidad, Green Initiatives trabaja para reducir nuestra huella ambiental.
          Esto incluye la implementación de políticas de trabajo remoto para disminuir las emisiones de carbono y el uso de 
          herramientas digitales para minimizar el uso de papel.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Además, patrocinamos proyectos de reforestación y colaboramos con empresas que comparten nuestra visión de un planeta
          más verde y sostenible.
        </p>
        <a
          href="#"
          className="text-green-600 hover:text-green-500 font-medium transition"
        >
          Lea más sobre nuestras iniciativas →
        </a>
      </div>
    </div>

    {/* Cuarta iniciativa */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Tech For Good</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Tech For Good utiliza tecnología avanzada para resolver problemas sociales y mejorar la calidad de vida en comunidades desfavorecidas.
          Desde el desarrollo de aplicaciones educativas hasta sistemas de gestión de recursos hídricos, esta iniciativa impacta directamente en
          áreas críticas.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          En 2023, Tech For Good entregó soluciones tecnológicas a más de 200 comunidades, marcando un antes y un después en términos de accesibilidad
          y eficiencia en servicios básicos.
        </p>
        <a
          href="#"
          className="text-green-600 hover:text-green-500 font-medium transition"
        >
          Conozca los proyectos en curso →
        </a>
      </div>
      <img
        src="/tech-for-good.jpg"
        alt="Tech For Good"
        className="rounded-lg shadow-md w-full object-cover h-64 md:h-80 transition-transform duration-300 hover:scale-105"
      />
    </div>
  </div>
</section>

      </main>
    );
  }
  
  export default AboutPage;
  