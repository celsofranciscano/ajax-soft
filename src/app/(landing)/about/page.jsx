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
          {/* Enlace de imagen personalizado */}
          <img
            src="https://avatars.githubusercontent.com/u/152909395?v=4"
            alt={`Líder Ejecutivo ${i + 1}`}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Líder Ejecutivo {i + 1}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Puesto {i + 1}</p>
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
{/* Sección: Ajaxsoft */}
<section id="impact-initiatives" className="bg-gray-50 dark:bg-zinc-950 py-16 px-8 md:px-16">
  <h2 className="text-3xl font-bold text-center mb-12 tracking-tight text-gray-800 dark:text-white">
    Sobre Ajaxsoft
  </h2>
  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto leading-relaxed mb-12">
    Ajaxsoft es una empresa emergente de desarrollo tecnológico creada por estudiantes apasionados de la Universidad Domingo Savio. 
    Nuestro objetivo es ofrecer soluciones innovadoras mientras adquirimos experiencia práctica en el mundo real.
  </p>
  <div className="grid gap-12">
    {/* Primera iniciativa */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <img
        src="/project-collaboration.jpg"
        alt="Colaboración en Proyectos"
        className="rounded-lg shadow-md w-full object-cover h-64 md:h-80 transition-transform duration-300 hover:scale-105"
      />
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Colaboración en Proyectos</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          En Ajaxsoft, trabajamos en equipo para desarrollar proyectos de software que aborden necesidades reales. 
          Nuestra metodología fomenta la colaboración y nos prepara para los retos del mundo profesional.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Actualmente estamos desarrollando aplicaciones web para pequeñas empresas locales, ayudándolas a digitalizar 
          sus operaciones y mejorar su eficiencia.
        </p>
        <a
          href="#"
          className="text-green-600 hover:text-green-500 font-medium transition"
        >
          Conozca nuestros proyectos actuales →
        </a>
      </div>
    </div>

    {/* Segunda iniciativa */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Capacitación y Desarrollo</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Nuestro equipo participa en programas de formación continua, aprendiendo las últimas tecnologías y prácticas de desarrollo. 
          Este enfoque garantiza que nuestras soluciones sean modernas, eficientes y de alta calidad.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          También ofrecemos talleres gratuitos para otros estudiantes de la universidad, fomentando el intercambio de conocimientos y la colaboración entre pares.
        </p>
        <a
          href="#"
          className="text-green-600 hover:text-green-500 font-medium transition"
        >
          Descubra nuestros talleres →
        </a>
      </div>
      <img
        src="/training.jpg"
        alt="Capacitación y Desarrollo"
        className="rounded-lg shadow-md w-full object-cover h-64 md:h-80 transition-transform duration-300 hover:scale-105"
      />
    </div>

    {/* Tercera iniciativa */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <img
        src="/community-support.jpg"
        alt="Apoyo a la Comunidad"
        className="rounded-lg shadow-md w-full object-cover h-64 md:h-80 transition-transform duration-300 hover:scale-105"
      />
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Apoyo a la Comunidad</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          En Ajaxsoft, creemos en devolver a la comunidad. Participamos activamente en proyectos de voluntariado tecnológico, 
          como la creación de plataformas gratuitas para ONGs y la formación en habilidades digitales para jóvenes de la región.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Este enfoque nos permite combinar nuestras pasiones por la tecnología y el impacto social.
        </p>
        <a
          href="#"
          className="text-green-600 hover:text-green-500 font-medium transition"
        >
          Conozca nuestras iniciativas comunitarias →
        </a>
      </div>
    </div>

    {/* Cuarta iniciativa */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Innovación y Creatividad</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          La creatividad es el corazón de Ajaxsoft. Trabajamos en proyectos innovadores como aplicaciones basadas en inteligencia 
          artificial y herramientas que simplifican la vida cotidiana de las personas.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Nuestro enfoque experimental nos permite explorar nuevas ideas y convertirlas en soluciones prácticas para nuestros clientes.
        </p>
        <a
          href="#"
          className="text-green-600 hover:text-green-500 font-medium transition"
        >
          Explore nuestras soluciones creativas →
        </a>
      </div>
      <img
        src="/innovation.jpg"
        alt="Innovación y Creatividad"
        className="rounded-lg shadow-md w-full object-cover h-64 md:h-80 transition-transform duration-300 hover:scale-105"
      />
    </div>
  </div>
</section>


      </main>
    );
  }
  
  export default AboutPage;
  