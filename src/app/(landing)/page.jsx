<<<<<<< HEAD
'use client';
import React, { useState } from "react";

const PortfolioComplete = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExperienceMenuOpen, setIsExperienceMenuOpen] = useState(false); // Nuevo estado para el menú de experiencia

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleExperienceMenu = () => {  // Función para mostrar/ocultar el menú de experiencia
    setIsExperienceMenuOpen(!isExperienceMenuOpen);
  };

  const teamMembers = [
    {
      name: "Celso Franciscano",
      role: "CEO & Fundador",
      image: "https://scontent.fcbb3-1.fna.fbcdn.net/v/t1.6435-9/78260617_806892099764363_6626643996628221952_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=y6tbCsa-mdgQ7kNvgFMqWqw&_nc_zt=23&_nc_ht=scontent.fcbb3-1.fna&_nc_gid=Aak_1Y6iK9ZJMsbvn7WO_bG&oh=00_AYCNuNPCC8oEL6Q7k8zs9jvlKFXwPLleWEUxtA_oJsdBhg&oe=676A69CD/150",
      bio: "Apasionado por liderar proyectos innovadores. Más de 10 años de experiencia en desarrollo de software.",
      projects: ["Sistema de Gestión Empresarial", "Aplicación de Comercio Electrónico"],
    },
    {
      name: "Oscar Flores",
      role: "Gerente de Proyecto",
      image: "https://drive.google.com/file/d/1FKIS8s62Usjmyv7U8Noj46bi2m70WJPu/view?usp=drivesdk/150",
      bio: "Gestionando proyectos tecnológicos con enfoque en productividad y eficiencia.",
      projects: ["Plataforma de Colaboración", "CRM para PyMEs"],
    },
    {
      name: "Andres Rocha",
      role: "Desarrollador Full Stack",
      image: "https://drive.google.com/file/d/1FNzSmhhMDrBclrFE51nIoAdNfdgQykFI/view?usp=drivesdk/150",
      bio: "Especialista en tecnologías frontend y backend. Apasionado por el desarrollo web.",
      projects: ["Sistema de Reservas Online", "Dashboard Analítico"],
    },
    {
      name: "Adam Choquetarqui",
      role: "Diseñador UI/UX",
      image: "https://drive.google.com/file/d/1FNzSmhhMDrBclrFE51nIoAdNfdgQykFI/view?usp=drivesdk/150",
      bio: "Creando experiencias visuales atractivas y funcionales para aplicaciones web y móviles.",
      projects: ["Diseño para E-commerce", "Interfaz de Usuario de App Fitness"],
    },
    {
      name: "Dylan Castro",
      role: "Científico de Datos",
      image: "https://drive.google.com/file/d/1FNzSmhhMDrBclrFE51nIoAdNfdgQykFI/view?usp=drivesdk/150",
      bio: "Transformando datos en conocimiento, con experiencia en inteligencia artificial.",
      projects: ["Análisis Predictivo de Ventas", "Sistema de Recomendaciones"],
    },
  ];

  const companyProjects = [
    "Sistema Integral de Gestión Hotelera",
    "Aplicación de Logística para Transporte",
    "Plataforma de E-learning",
    "Solución de Inteligencia de Negocios",
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Header */}
      <header className="bg-blue-900 py-6 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white tracking-tight hover:text-green-500 cursor-pointer">Ajax-Soft</h1>
          <nav className="space-x-8 text-sm font-medium hidden md:block">
            <button
              onClick={() => window.location.hash = "#about"}
              className="text-white hover:text-green-500 transition duration-300 px-4 py-2 rounded-lg bg-transparent border border-transparent hover:border-green-500"
            >
              Sobre Nosotros
            </button>
            <button
              onClick={() => window.location.hash = "#team"}
              className="text-white hover:text-green-500 transition duration-300 px-4 py-2 rounded-lg bg-transparent border border-transparent hover:border-green-500"
            >
              Nuestro Equipo
            </button>
            <button
              onClick={() => window.location.hash = "#projects"}
              className="text-white hover:text-green-500 transition duration-300 px-4 py-2 rounded-lg bg-transparent border border-transparent hover:border-green-500"
            >
              Proyectos
            </button>
            <button
              onClick={() => window.location.hash = "#contact"}
              className="text-white hover:text-green-500 transition duration-300 px-4 py-2 rounded-lg bg-transparent border border-transparent hover:border-green-500"
            >
              Contacto
            </button>
          </nav>
          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white md:hidden px-4 py-2 rounded-lg bg-transparent border border-transparent hover:border-green-500"
          >
            Menú
          </button>
          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute mt-2 bg-gray-800 rounded-lg shadow-md p-4 md:hidden">
              <button
                onClick={() => window.location.hash = "#about"}
                className="block text-white hover:text-green-500 mb-2"
              >
                Sobre Nosotros
              </button>
              <button
                onClick={() => window.location.hash = "#team"}
                className="block text-white hover:text-green-500 mb-2"
              >
                Nuestro Equipo
              </button>
              <button
                onClick={() => window.location.hash = "#projects"}
                className="block text-white hover:text-green-500 mb-2"
              >
                Proyectos
              </button>
              <button
                onClick={() => window.location.hash = "#contact"}
                className="block text-white hover:text-green-500 mb-2"
              >
                Contacto
              </button>
              {/* Botón para abrir el menú de experiencia */}
              <button
                onClick={toggleExperienceMenu}
                className="block text-white hover:text-green-500 mt-4"
              >
                Experiencia
              </button>
              {/* Menú de experiencia */}
              {isExperienceMenuOpen && (
                <div className="bg-gray-700 rounded-lg p-4 mt-2">
                  <button
                    onClick={() => window.location.hash = "#experience-companies"}
                    className="block text-white hover:text-green-500 mb-2"
                  >
                    Empresas
                  </button>
                  <button
                    onClick={() => window.location.hash = "#experience-education"}
                    className="block text-white hover:text-green-500 mb-2"
                  >
                    Educación
                  </button>
                  <button
                    onClick={() => window.location.hash = "#experience-certifications"}
                    className="block text-white hover:text-green-500"
                  >
                    Certificados
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-cover bg-center h-80 flex items-center justify-center relative" style={{ backgroundImage: "url('https://arctic-council.org/site/assets/files/9090/craig-mckay-gndl-el3n00-unsplash.1200x400.webp/1200x400')" }}>
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50"></div>
        <div className="relative text-center z-10">
          <h2 className="text-5xl font-bold mb-4 text-white">Bienvenidos a Ajax-Soft</h2>
          <p className="text-lg text-gray-200">Liderando soluciones tecnológicas para el futuro.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-blue-500 text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-semibold text-white mb-6">¿Quiénes somos?</h3>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Ajax-Soft es una empresa dedicada a ofrecer soluciones tecnológicas innovadoras. Nuestro equipo está formado por profesionales apasionados por el desarrollo y diseño de software.
=======
function LandingPage() {
  return (
    <main className="grid gap-8">
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2   ">
        <img
          src="/fondo.jpg"
          alt="Portada"
          className="w-full object-cover md:order-2"
        />
        <div className="flex  flex-col justify-center items-center md:items-start space-y-4 text-black dark:text-white">
          <p className=" text-lg md:text-xl">🧑‍💻 Explora Nuestros Servicios</p>

          <h1 className="text-3xl md:text-4xl font-medium ">
            Desarrollo web a medida
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-center">
            Digitaliza tu negocio y automatiza diferentes tareas repetitivas.
>>>>>>> f7ff5c4cc200ad6bfbac9c753aa4aa9865b92006
          </p>

          <button className="bg-blue-500 rounded-md px-4 py-2 hover:bg-green-600 flex items-center gap-2 text-white">
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                clipRule="evenodd"
              />
              <path
                fill="currentColor"
                d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
              />
            </svg>
            <span>Contacto</span>
          </button>
        </div>
      </section>

<<<<<<< HEAD
      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-semibold text-center text-white mb-10">Nuestro Equipo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-700 rounded-lg shadow-xl text-center p-6 hover:scale-105 transition-transform duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-green-500"
                />
                <h4 className="text-xl font-semibold">{member.name}</h4>
                <p className="text-green-400">{member.role}</p>
                <p className="text-sm mt-2 text-gray-300">{member.bio}</p>
              </div>
            ))}
=======
      <section className="grid md:grid-cols-3 gap-4 ">
        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-md p-4 flex items-center gap-2 ">
          <svg
            className="size-8 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
            />
          </svg>

          <div>
            <h1 className="text-lg text-black dark:text-white font-medium">
              Sucursal - CBBA
            </h1>
            <p>Av. General Galindo , entre America y M.Melgarejo</p>
          </div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-md p-4 flex items-center gap-2 ">
          <svg
            className="size-8 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M13 7h6l2 4m-8-4v8H9m4-8V6c0-.26522-.1054-.51957-.2929-.70711C12.5196 5.10536 12.2652 5 12 5H4c-.26522 0-.51957.10536-.70711.29289C3.10536 5.48043 3 5.73478 3 6v9h2m14 0h2v-4m0 0h-5M8 8.66669V10l1.5 1.5m10 5c0 1.3807-1.1193 2.5-2.5 2.5s-2.5-1.1193-2.5-2.5S15.6193 14 17 14s2.5 1.1193 2.5 2.5Zm-10 0C9.5 17.8807 8.38071 19 7 19s-2.5-1.1193-2.5-2.5S5.61929 14 7 14s2.5 1.1193 2.5 2.5Z"
            />
          </svg>

          <div>
            <h1 className="text-lg text-black dark:text-white font-medium">
              Envios a toda Bolivia
            </h1>
            <p>Envios via buses</p>
          </div>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-md p-4 flex items-center gap-2 ">
          <svg
            className="size-8 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z"
            />
          </svg>

          <div>
            <h1 className="text-lg text-black dark:text-white font-medium">
              Reservas
            </h1>
            <p>Reserva tu prenda favorita</p>
>>>>>>> f7ff5c4cc200ad6bfbac9c753aa4aa9865b92006
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-semibold text-center text-white mb-10">Proyectos</h3>
          <h4 className="text-2xl font-semibold text-white mb-6">Proyectos Individuales</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200">
                <h5 className="font-semibold text-xl text-white mb-2">{member.name}</h5>
                <ul className="list-disc list-inside text-sm text-gray-300">
                  {member.projects?.map((project, i) => (
                    <li key={i}>{project}</li>
                  )) || <p>No tiene proyectos asignados.</p>}
                </ul>
              </div>
            ))}
          </div>
          <h4 className="text-2xl font-semibold text-white mt-12 mb-6">Proyectos de la Empresa</h4>
          <ul className="list-disc list-inside text-sm text-gray-300">
            {companyProjects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
      </section> 
       {/* Portafolio */}
       <section id="portafolio" className="py-16 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Nuestro Portafolio mas Destacado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((project, index) => (
              <div key={index} className="bg-black p-4 rounded-lg shadow">
                <img
                  className="w-full h-40 object-cover rounded-md"
                  src={`https://via.placeholder.com/300?text=Proyecto+${project}`}
                  alt={`Proyecto ${project}`}
                />
                <h3 className="text-lg font-medium mt-4">Proyecto {project}</h3>
                <p className="text-sm text-gray-600">Descripción breve del proyecto.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
       {/* Servicios */}
       <section id="servicios" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[
              { icon: "💻", title: "Desarrollo Web", desc: "Sitios web modernos y responsivos." },
              { icon: "📱", title: "Aplicaciones Móviles", desc: "Soluciones móviles personalizadas." },
              { icon: "🔒", title: "Ciberseguridad", desc: "Protección para tus datos." },
            ].map((service, index) => (
              <div key={index} className="text-center bg-blue-500 p-6 rounded-lg shadow">
                <div className="text-4xl">{service.icon}</div>
                <h3 className="text-lg font-medium mt-4">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-semibold text-white mb-6">Contacto</h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            ¿Tienes un proyecto en mente? Contáctanos para hacer tus ideas realidad.
          </p>
          <div className="space-x-4">
            <a
              href="mailto:info@ajax-soft.com"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Enviar Correo
            </a>
            <a
              href="https://es-la.facebook.com/login/device-based/regular/login/"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/accounts/login/?source=auth_switcher&locale=es_ES/"
              className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://web.whatsapp.com/"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Ajax-Soft. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default PortfolioComplete;
=======
      <section className="grid md:grid-cols-3 gap-4">
        <img
          className="rounded-md"
          src="https://scontent.fcbb3-1.fna.fbcdn.net/v/t39.30808-6/463376551_555778343701177_7468676522113076908_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=LqUKUWYcEqIQ7kNvgFi8wo7&_nc_zt=23&_nc_ht=scontent.fcbb3-1.fna&_nc_gid=ATQpyNbRM7mQBDR7WrmCFr_&oh=00_AYCyh7mqZABedTXyQKlNgSm95rgKUSpHJT86SR_nfuqvaA&oe=6714A13C"
          alt=""
        />
        <img
          className="rounded-md"
          src="https://scontent.fcbb3-1.fna.fbcdn.net/v/t39.30808-6/462217445_549507680994910_3475549402871271483_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=NzjQc36qJqEQ7kNvgH3PtYJ&_nc_zt=23&_nc_ht=scontent.fcbb3-1.fna&_nc_gid=AvH1Mmil051KXbB3XIkGl3o&oh=00_AYBtk2ZLtpDBrHl00abi-zuTLQ0YfxwrHICfQxudO0IbkA&oe=67149DEC"
          alt=""
        />
        <img
          className="rounded-md"
          src="https://scontent.fcbb3-1.fna.fbcdn.net/v/t39.30808-6/462910927_555775530368125_7066909408599866038_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=fpcswKf8oHcQ7kNvgERdPPn&_nc_zt=23&_nc_ht=scontent.fcbb3-1.fna&_nc_gid=AREbV4SUrYZ1-NhLhaTsE9_&oh=00_AYBR4llYcDftjL_IMAzXtj4-70VAvQPuLcra7tpFlevQ9Q&oe=6714A852"
          alt=""
        />
      </section>

      <h1 className="text-black dark:text-white font-medium text-xl">
        Nuevas prendas
      </h1>
    </main>
  );
}

export default LandingPage;
>>>>>>> f7ff5c4cc200ad6bfbac9c753aa4aa9865b92006
