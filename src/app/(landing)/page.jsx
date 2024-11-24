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
      image: "https://via.placeholder.com/150",
      bio: "Apasionado por liderar proyectos innovadores. Más de 10 años de experiencia en desarrollo de software.",
      projects: ["Sistema de Gestión Empresarial", "Aplicación de Comercio Electrónico"],
    },
    {
      name: "Oscar Flores",
      role: "Gerente de Proyecto",
      image: "https://via.placeholder.com/150",
      bio: "Gestionando proyectos tecnológicos con enfoque en productividad y eficiencia.",
      projects: ["Plataforma de Colaboración", "CRM para PyMEs"],
    },
    {
      name: "Andres Rocha",
      role: "Desarrollador Full Stack",
      image: "https://via.placeholder.com/150",
      bio: "Especialista en tecnologías frontend y backend. Apasionado por el desarrollo web.",
      projects: ["Sistema de Reservas Online", "Dashboard Analítico"],
    },
    {
      name: "Adam Choquetarqui",
      role: "Diseñador UI/UX",
      image: "https://via.placeholder.com/150",
      bio: "Creando experiencias visuales atractivas y funcionales para aplicaciones web y móviles.",
      projects: ["Diseño para E-commerce", "Interfaz de Usuario de App Fitness"],
    },
    {
      name: "Dylan Castro",
      role: "Científico de Datos",
      image: "https://via.placeholder.com/150",
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
      <section className="bg-cover bg-center h-80 flex items-center justify-center relative" style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center z-10">
          <h2 className="text-5xl font-bold mb-4 text-white">Bienvenidos a Ajax-Soft</h2>
          <p className="text-lg text-gray-200">Liderando soluciones tecnológicas para el futuro.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-semibold text-white mb-6">¿Quiénes somos?</h3>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Ajax-Soft es una empresa dedicada a ofrecer soluciones tecnológicas innovadoras. Nuestro equipo está formado por profesionales apasionados por el desarrollo y diseño de software.
          </p>
        </div>
      </section>

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
          </div>
        </div>
      </section>

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
              href="https://www.instagram.com/"
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
