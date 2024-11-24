import React from "react";

const PortfolioComplete = () => {
  const teamMembers = [
    {
      name: "Celso Franciscano",
      role: "CEO & Founder",
      image: "https://via.placeholder.com/150",
      bio: "Apasionado por liderar proyectos innovadores. Más de 10 años de experiencia en desarrollo de software.",
    },
    {
      name: "Oscar Flores",
      role: "Project Manager",
      image: "https://via.placeholder.com/150",
      bio: "Gestionando proyectos tecnológicos con enfoque en productividad y eficiencia.",
    },
    {
      name: "Andres Rocha",
      role: "Full Stack Developer",
      image: "https://via.placeholder.com/150",
      bio: "Especialista en tecnologías frontend y backend. Apasionado por el desarrollo web.",
    },
    {
      name: "Adam Choquetarqui",
      role: "UI/UX Designer",
      image: "https://via.placeholder.com/150",
      bio: "Creando experiencias visuales atractivas y funcionales para aplicaciones web y móviles.",
    },
    {
      name: "kimy Rocha ",
      role: "Data Scientist",
      image: "https://via.placeholder.com/150",
      bio: "Transformando datos en conocimiento, con experiencia en inteligencia artificial.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Ajax-Soft</h1>
          <nav className="space-x-4 text-sm">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#team" className="hover:underline">
              Team
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-cover bg-center h-80 flex items-center justify-center relative" style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center z-10">
          <h2 className="text-5xl font-bold mb-4">Bienvenidos a Ajax-Soft</h2>
          <p className="text-lg">Liderando soluciones tecnológicas para el futuro.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">¿Quiénes somos?</h3>
          <p className="text-lg leading-relaxed">
            Ajax-Soft es una empresa dedicada a ofrecer soluciones tecnológicas innovadoras. Nuestro equipo está formado por profesionales apasionados por el desarrollo y diseño de software.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10">Nuestro Equipo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-md text-center p-6 hover:scale-105 transition-transform"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h4 className="text-xl font-semibold">{member.name}</h4>
                <p className="text-purple-400">{member.role}</p>
                <p className="text-sm mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">Contacto</h3>
          <p className="text-lg leading-relaxed mb-6">
            ¿Tienes un proyecto en mente? Contáctanos para hacer tus ideas realidad.
          </p>
          <a
            href="mailto:info@ajax-soft.com"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Enviar correo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Ajax-Soft. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioComplete;

