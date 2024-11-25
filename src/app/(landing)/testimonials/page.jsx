export default function TestimonialsPage (){

    return <section>
    <h1>
    Pagina de Testimonio</h1>
    <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Real people, <span className="text-purple-600">real results</span>
          </h1>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonio 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Foto de Perfil"
                  className="rounded-full"
                />
              </div>
              <p className="ml-4 text-gray-900 font-bold">Carlos</p>
            </div>
            <p className="text-gray-600">
              “Encontré al equipo ideal para mi proyecto de diseño gráfico en muy poco tiempo. 
              La plataforma facilitó todo el proceso, desde la publicación de la oferta hasta la entrega final. ¡Excelente experiencia!”
            </p>
          </div>

          {/* Testimonio 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Foto de Perfil"
                  className="rounded-full"
                />
              </div>
              <p className="ml-4 text-gray-900 font-bold">Laura</p>
            </div>
            <p className="text-gray-600">
              “Como freelancer, esta plataforma me ha permitido conectar con empresas que realmente valoran mi trabajo. 
              La gestión de proyectos es muy intuitiva y me permite concentrarme en lo importante.”
            </p>
          </div>

          {/* Testimonio 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Foto de Perfil"
                  className="rounded-full"
                />
              </div>
              <p className="ml-4 text-gray-900 font-bold">Andrés</p>
            </div>
            <p className="text-gray-600">
              “Lo que más me gusta es la transparencia en los procesos. Puedo ver claramente los detalles del proyecto, 
              gestionar tiempos y mantener comunicación fluida con los freelancers. Totalmente recomendable.”
            </p>
          </div>

          {/* Testimonio 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Foto de Perfil"
                  className="rounded-full"
                />
              </div>
              <p className="ml-4 text-gray-900 font-bold">Mariana</p>
            </div>
            <p className="text-gray-600">
              “He logrado colaborar en proyectos internacionales gracias a esta plataforma. 
              Me encanta lo fácil que es mostrar mi portafolio y recibir propuestas personalizadas.”
            </p>
          </div>

          {/* Testimonio 5 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Foto de Perfil"
                  className="rounded-full"
                />
              </div>
              <p className="ml-4 text-gray-900 font-bold">Sofía</p>
            </div>
            <p className="text-gray-600">
              “Publicar proyectos nunca fue tan sencillo. En pocos días encontré profesionales que se ajustaron a mis necesidades, 
              y el seguimiento del progreso fue impecable.”
            </p>
          </div>

          {/* Testimonio 6 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Foto de Perfil"
                  className="rounded-full"
                />
              </div>
              <p className="ml-4 text-gray-900 font-bold">Daniel</p>
            </div>
            <p className="text-gray-600">
              “Gracias a esta página he podido mantener un flujo constante de trabajo como programador independiente. 
              Me siento respaldado en cada etapa del proyecto, desde el acuerdo hasta el pago.”
            </p>
          </div>
        </div>
      </div>
    </section>
}