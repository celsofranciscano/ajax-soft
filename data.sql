INSERT INTO "tbdepartments" ("department", "description") VALUES
('Gerencia General', 'Encargado de la dirección estratégica y liderazgo de AjaxSoft.'),
('Departamento de Operaciones', 'Responsable de las actividades operativas, asegurando la eficiencia en los proyectos de desarrollo de software.'),
('Departamento de Tecnología y Desarrollo de Software', 'Dirige la visión tecnológica y el desarrollo de soluciones de software innovadoras en AjaxSoft.'),
('Departamento de Marketing y Ventas', 'Supervisa estrategias de marketing y ventas para posicionar a AjaxSoft en el mercado y captar nuevos clientes.'),
('Departamento de Recursos Humanos', 'Gestiona el talento humano, el bienestar laboral y los procesos de reclutamiento enfocados en perfiles tecnológicos para AjaxSoft.');









-- Roles para el Departamento de Gerencia General
INSERT INTO "tbroles" ("FK_department", "role", "description") VALUES
(1, 'CEO', 'Responsable de la dirección estratégica y liderazgo de AjaxSoft.');

-- Roles para el Departamento de Operaciones
INSERT INTO "tbroles" ("FK_department", "role", "description") VALUES
(2, 'COO', 'Supervisa las operaciones diarias y asegura la eficiencia operacional.'),
(2, 'Gerente de Operaciones', 'Coordina las actividades operativas diarias y gestiona recursos.'),
(2, 'QA Engineer', 'Asegura la calidad del software mediante pruebas y validaciones.'),
(2, 'Especialista en Soporte Técnico', 'Resuelve problemas técnicos internos y asegura la continuidad operativa.'),
(2, 'Administrador de Redes', 'Gestiona la infraestructura de red y garantiza la conectividad.');

-- Roles para el Departamento de Tecnología y Desarrollo de Software
INSERT INTO "tbroles" ("FK_department", "role", "description") VALUES
(3, 'CTO', 'Dirige la visión tecnológica y toma decisiones sobre las plataformas y herramientas de desarrollo.'),
(3, 'Gerente de Desarrollo de Software', 'Supervisa los proyectos de desarrollo y coordina los equipos técnicos.'),
(3, 'Arquitecto de Software', 'Diseña la arquitectura técnica de las soluciones de software.'),
(3, 'Diseñador Grafico', 'Crea y mejora la experiencia del usuario UX/UI.'),
(3, 'Administrador de Base de Datos', 'Administra toda la arquitectura de la base de datos.'),
(3, 'Desarrollador Backend', 'Desarrolla la lógica del servidor y las APIs necesarias para las aplicaciones.'),
(3, 'Desarrollador Frontend', 'Crea la interfaz de usuario de las aplicaciones web utilizando tecnologías modernas.'),
(3, 'Ingeniero DevOps', 'Automatiza los procesos de despliegue continuo y administra la infraestructura.');

-- Roles para el Departamento de Marketing y Ventas
INSERT INTO "tbroles" ("FK_department", "role", "description") VALUES
(4, 'CMO', 'Diseña y supervisa la estrategia de marketing global de AjaxSoft.'),
(4, 'Gerente de Ventas', 'Lidera el equipo de ventas y supervisa el cumplimiento de los objetivos comerciales.'),
(4, 'Especialista en Marketing Digital', 'Gestiona campañas digitales, redes sociales y optimización de SEO/SEM.'),
(4, 'Analista de Datos de Marketing', 'Analiza el rendimiento de campañas y genera reportes estratégicos.');

-- Roles para el Departamento de Recursos Humanos
INSERT INTO "tbroles" ("FK_department", "role", "description") VALUES
(5, 'CHRO', 'Define y dirige las políticas de recursos humanos y gestión del talento.'),
(5, 'Gerente de Recursos Humanos', 'Supervisa la contratación, desarrollo y bienestar del personal de AjaxSoft.'),
(5, 'Especialista en Reclutamiento', 'Lidera los procesos de selección para perfiles técnicos y culturales.'),
(5, 'Coordinador de Capacitación y Desarrollo', 'Desarrolla programas de formación y crecimiento profesional para los empleados.');







-- Insertar privilegios en la tabla tbprivileges
INSERT INTO "tbprivileges" ("privilege") VALUES
('Superadministrador'),
('Administrador'),
('Lectura');







-- Insertar usuarios en la tabla tbusers
INSERT INTO "tbusers" ("FK_privilege", "FK_role", "CI", "firstName", "lastName", "email", "password") VALUES
(1, 1, '23456789', 'Celso Franciscano', 'Choque', 'celso@example.com', 'password3'),
(3, 11, '12345678', 'Dylan Neil', 'Castro Cortez', 'dylan@example.com', 'password1'),
(2, 12, '87654321', 'Oscar', 'Flores Herrera', 'oscar@example.com', 'password2'),
(3, 13, '34567890', 'Angel Andres', 'Rocha Gomez', 'angel@example.com', 'password4');








-- Insertar las fases del proceso de desarrollo en la tabla tbphases
INSERT INTO "tbphases" ("phase", "description") VALUES
('Contacto Inicial y Descubrimiento', 'Reuniones iniciales para definir el alcance, recopilar requisitos y documentar necesidades del cliente.'),
('Propuesta y Planificación', 'Revisión y aprobación de requisitos, elaboración de la propuesta técnica, definición del presupuesto, cronograma y recursos.'),
('Análisis de Requerimientos y Diseño UI/UX', 'Diseño de la interfaz de usuario (UI) y experiencia de usuario (UX), análisis detallado de los flujos y creación de prototipos.'),
('Modelado y Diseño de Base de Datos', 'Creación de esquemas de bases de datos, definición de atributos, claves primarias, foráneas y estándares de nomenclatura.'),
('Desarrollo del Producto', 'Implementación del código del sistema basado en los requisitos y diseños aprobados, desarrollo de backend y frontend.'),
('Testing y Control de Calidad', 'Ejecución de pruebas funcionales, de rendimiento, seguridad y usabilidad para garantizar que el sistema cumpla los estándares.'),
('Documentación del Sistema', 'Elaboración de manuales técnicos y de usuario, documentación de procesos y arquitectura del sistema.'),
('Implementación y Lanzamiento', 'Despliegue del sistema en el entorno de producción, configuración de servidores, migración de datos y validación final.'),
('Formación y Transferencia de Conocimientos', 'Capacitación del cliente y su equipo en el uso del sistema, entrega de manuales y resolución de dudas.'),
('Soporte Post-Implementación y Mantenimiento', 'Provisión de soporte y mantenimiento tras el lanzamiento, incluyendo resolución de errores y actualizaciones críticas.');








-- Insertar etapas dentro de cada fase en la tabla tbstages
INSERT INTO "tbstages" ("FK_phase", "stage", "description") VALUES
-- Etapas de la fase "Contacto Inicial y Descubrimiento"
(1, 'Reunión inicial con stakeholders', 'Identificar metas y expectativas del cliente.'),
(1, 'Levantamiento de requisitos funcionales', 'Características específicas que el sistema debe cumplir (flujos, módulos).'),
(1, 'Levantamiento de requisitos no funcionales', 'Rendimiento, seguridad, escalabilidad, estándares legales.'),
(1, 'Análisis de procesos actuales', 'Revisión de los procesos existentes del cliente.'),
(1, 'Documentación preliminar de requisitos', 'Documentación de los requisitos en formatos estandarizados (ej.: SRS - Software Requirements Specification).'),

-- Etapas de la fase "Propuesta y Planificación"
(2, 'Validación de requisitos funcionales y no funcionales', 'Confirmar que los requisitos estén alineados con las expectativas del cliente.'),
(2, 'Elaboración de la propuesta técnica', 'Especificar tecnologías, metodologías y arquitecturas a utilizar.'),
(2, 'Definición de cronograma detallado', 'Establecer los hitos y entregables del proyecto.'),
(2, 'Estimación de costos y recursos', 'Calcular los recursos necesarios, incluyendo infraestructura, licencias, y mano de obra.'),
(2, 'Plan de comunicación del proyecto', 'Definir los canales y la frecuencia de las reuniones del proyecto.'),

-- Etapas de la fase "Análisis de Requerimientos y Diseño UI/UX"
(3, 'Definición de flujos de usuario', 'Crear diagramas de los flujos de usuario basados en los requisitos funcionales.'),
(3, 'Creación de wireframes y mockups', 'Diseñar los primeros prototipos visuales de la interfaz de usuario.'),
(3, 'Diseño UI detallado', 'Especificar los detalles visuales, como colores, tipografía y diseño responsivo.'),
(3, 'Diseño UX', 'Optimizar la experiencia del usuario, jerarquía de navegación e interacciones.'),
(3, 'Validación de prototipos interactivos', 'Probar los prototipos con los usuarios y recibir feedback.'),
(3, 'Actualización de documentación del diseño', 'Actualizar la documentación de diseño según los comentarios recibidos.'),

-- Etapas de la fase "Modelado y Diseño de Base de Datos"
(4, 'Definición del modelo lógico y físico', 'Crear el modelo lógico de la base de datos y su estructura física.'),
(4, 'Creación de esquemas y tablas', 'Diseñar las tablas, claves primarias y foráneas siguiendo estándares de nomenclatura.'),
(4, 'Definición de relaciones', 'Establecer las relaciones entre las tablas (PK, FK) y las cardinalidades.'),
(4, 'Optimización de consultas', 'Crear índices y optimizar las consultas para mejorar el rendimiento.'),
(4, 'Validación del diseño con desarrolladores', 'Revisar el diseño de la base de datos con el equipo de desarrollo backend.'),

-- Etapas de la fase "Desarrollo del Producto"
(5, 'Configuración del entorno de desarrollo', 'Configurar herramientas de desarrollo, control de versiones (Git), y CI/CD.'),
(5, 'Implementación del backend', 'Desarrollar la API, autenticación, lógica de negocio y acceso a la base de datos.'),
(5, 'Implementación del frontend', 'Desarrollar la interfaz de usuario, integrar el diseño UI/UX y agregar componentes interactivos.'),
(5, 'Integración de backend y frontend', 'Probar la conectividad entre el backend y el frontend.'),
(5, 'Pruebas unitarias en cada módulo', 'Realizar pruebas unitarias en cada módulo desarrollado.'),
(5, 'Revisiones de código', 'Revisar el código regularmente para garantizar calidad y cumplir con los estándares.'),

-- Etapas de la fase "Testing y Control de Calidad"
(6, 'Pruebas unitarias', 'Realizar pruebas unitarias para cada módulo funcional.'),
(6, 'Pruebas integradas', 'Verificar las interacciones entre los módulos del sistema.'),
(6, 'Pruebas de rendimiento', 'Realizar pruebas de carga y estrés para medir los tiempos de respuesta del sistema.'),
(6, 'Pruebas de seguridad', 'Validar la autenticación, cifrado y posibles vulnerabilidades del sistema.'),
(6, 'Pruebas de usabilidad', 'Revisar con los usuarios finales para evaluar la experiencia del sistema.'),
(6, 'Generación de reportes de errores', 'Identificar y generar reportes de errores encontrados durante las pruebas.'),

-- Etapas de la fase "Documentación del Sistema"
(7, 'Creación de manual técnico', 'Documentar la arquitectura, APIs, base de datos y configuraciones del sistema.'),
(7, 'Elaboración de manual de usuario', 'Crear guías de uso básico y avanzado del sistema.'),
(7, 'Documentación de procesos', 'Incluir diagramas de flujo y procesos de negocio.'),
(7, 'Entrega de documentación final', 'Entregar la documentación finalizada al cliente.'),

-- Etapas de la fase "Implementación y Lanzamiento"
(8, 'Configuración del entorno de producción', 'Configurar servidores, bases de datos y redes para el entorno de producción.'),
(8, 'Migración de datos', 'Transferir datos desde sistemas existentes si es necesario.'),
(8, 'Pruebas finales en producción', 'Realizar pruebas finales para validar el sistema en el entorno de producción.'),
(8, 'Apertura oficial del sistema', 'Hacer el sistema disponible para el cliente.'),

-- Etapas de la fase "Formación y Transferencia de Conocimientos"
(9, 'Sesiones de capacitación personalizadas', 'Capacitar al equipo del cliente en el uso del sistema.'),
(9, 'Entrega de manuales técnicos y de usuario', 'Proveer los manuales para usuarios y técnicos.'),
(9, 'Resolución de dudas e interacción directa', 'Brindar soporte para resolver dudas de los usuarios clave.'),
(9, 'Evaluación final de conocimientos adquiridos', 'Verificar que el equipo del cliente haya comprendido correctamente el sistema.'),

-- Etapas de la fase "Soporte Post-Implementación y Mantenimiento"
(10, 'Monitoreo activo del sistema', 'Realizar seguimiento continuo para identificar problemas o fallas.'),
(10, 'Resolución de errores reportados', 'Corregir errores reportados por el cliente o detectados durante el monitoreo.'),
(10, 'Actualizaciones críticas y preventivas', 'Implementar actualizaciones necesarias para mantener la estabilidad del sistema.'),
(10, 'Planificación de ciclos de mantenimiento futuros', 'Establecer un plan para futuros ciclos de mantenimiento y mejoras.');













-- Insertar categorías de sitios web
INSERT INTO "tbcategories" ("category", "description") VALUES
('E-commerce', 'Sitios web destinados al comercio electrónico, donde se venden productos o servicios online.'),
('Blog', 'Sitios web centrados en la publicación de contenido regularmente, generalmente de tipo personal, informativo o de entretenimiento.'),
('Corporativo', 'Sitios web que representan empresas o instituciones, brindando información sobre su negocio, productos, servicios y contacto.'),
('Educativo', 'Sitios web diseñados para impartir educación en línea, con materiales de aprendizaje, cursos y recursos educativos.'),
('Portafolio', 'Sitios web que presentan el trabajo o proyectos realizados por una persona o empresa, especialmente en áreas creativas.'),
('Noticias', 'Sitios web que ofrecen contenido de noticias, actualizaciones y artículos informativos sobre eventos recientes.'),
('Foro', 'Plataformas web que permiten la discusión entre usuarios a través de hilos de conversación y comentarios.'),
('Redes Sociales', 'Plataformas que permiten a los usuarios interactuar y compartir contenido, como fotos, textos y videos.'),
('Entretenimiento', 'Sitios web dedicados al entretenimiento, tales como videojuegos, películas, música y contenido interactivo.'),
('Servicios', 'Sitios web que ofrecen servicios online como asesoría, consulta, reservas, entre otros.');





-- Insertar registros en tbcustomers (12 clientes con información ficticia y realista)
INSERT INTO "tbcustomers" ("business", "firstName", "lastName", "email", "phoneNumber", "address", "password", "profileImage") VALUES
('TechBolivia', 'Juan', 'Pérez', 'juan.perez@techbolivia.com', '75345678', 'Calle 1, La Paz, Bolivia', 'securepassword123', 'https://example.com/profiles/juan_perez.jpg'),
('EcoEnergía', 'Maria', 'Gonzales', 'maria.gonzales@ecoenergia.bo', '74563219', 'Av. Bolivia 305, Santa Cruz, Bolivia', 'ecoenergy2024', 'https://example.com/profiles/maria_gonzales.jpg'),
('TiendaMóvil', 'Carlos', 'López', 'carlos.lopez@tiendamovil.bo', '76785934', 'Calle Comercio 8, Cochabamba, Bolivia', 'movilshop2024', 'https://example.com/profiles/carlos_lopez.jpg'),
('Bolivia Aprende', 'Ana', 'Ríos', 'ana.rios@boliviaaprende.org', '75567890', 'Calle Estudiantes 5, Sucre, Bolivia', 'educacion2024', 'https://example.com/profiles/ana_rios.jpg'),
('DiseñaBolivia', 'Pablo', 'Martínez', 'pablo.martinez@disenabolivia.com', '71548967', 'Av. Diseño 12, La Paz, Bolivia', 'disenocreativo2024', 'https://example.com/profiles/pablo_martinez.jpg'),
('NoticiasLaPaz', 'Sofia', 'Díaz', 'sofia.diaz@noticiaslapaz.bo', '75893456', 'Calle Periodista 45, La Paz, Bolivia', 'lapaznoticias2024', 'https://example.com/profiles/sofia_diaz.jpg'),
('DevBolivia', 'Luis', 'Gutiérrez', 'luis.gutierrez@devbolivia.org', '73546289', 'Calle Codificadores 33, Santa Cruz, Bolivia', 'devbolivia2024', 'https://example.com/profiles/luis_gutierrez.jpg'),
('RedProfesional', 'Patricia', 'Vargas', 'patricia.vargas@redprofesional.bo', '76456789', 'Av. Trabajo 22, Cochabamba, Bolivia', 'redpro2024', 'https://example.com/profiles/patricia_vargas.jpg'),
('SonidoBolivia', 'Eduardo', 'Hernández', 'eduardo.hernandez@sonidobolivia.bo', '75894321', 'Calle Música 13, La Paz, Bolivia', 'musica2024', 'https://example.com/profiles/eduardo_hernandez.jpg'),
('ConsultoraAvanzada', 'Elena', 'Sánchez', 'elena.sanchez@consultoraavanzada.bo', '76234567', 'Av. Empresarial 50, Sucre, Bolivia', 'consultoria2024', 'https://example.com/profiles/elena_sanchez.jpg'),
('TaxiLaPaz', 'Fernando', 'Morales', 'fernando.morales@taxilapaz.bo', '72345678', 'Calle Servicio 4, La Paz, Bolivia', 'taxilp2024', 'https://example.com/profiles/fernando_morales.jpg'),
('CulturaDigital', 'Javier', 'Ramírez', 'javier.ramirez@culturadigital.bo', '73124567', 'Calle Arte 28, Cochabamba, Bolivia', 'culturadigital2024', 'https://example.com/profiles/javier_ramirez.jpg');



-- Insertar registros de estados de progreso
INSERT INTO "tbstatus" ("status", "description") VALUES
('Pendiente', 'El proyecto ha sido iniciado, pero no ha comenzado el trabajo efectivo.'),
('En Proceso', 'El proyecto está en desarrollo, con tareas y fases en ejecución.'),
('En Revisión', 'El proyecto está siendo revisado por el cliente o equipo de calidad.'),
('Completado', 'El proyecto ha sido finalizado y entregado al cliente.'),
('En Espera', 'El proyecto está detenido temporalmente, esperando decisiones o recursos.'),
('Cancelado', 'El proyecto ha sido cancelado y no se llevará a cabo.'),
('En Mantenimiento', 'El proyecto está en una fase de soporte y mantenimiento posterior a la entrega.');






-- Insertar registros en tbprojects (12 proyectos con nombres realistas pero locales)
INSERT INTO "tbprojects" ("FK_status", "FK_customer", "FK_category", "FK_stage", "project", "description") VALUES
(1, 1, 1, 1, 'TechBolivia', 'Plataforma de e-commerce para la venta de productos tecnológicos y electrónicos en Bolivia.'),
(2, 2, 2, 2, 'EcoEnergía', 'Proyecto de energía renovable que promueve el uso de paneles solares en áreas rurales de Bolivia.'),
(3, 3, 3, 3, 'TiendaMóvil', 'Desarrollo de una app móvil para compras en línea, enfocada en productos nacionales y locales.'),
(4, 4, 4, 4, 'Bolivia Aprende', 'Plataforma educativa online que ofrece cursos y programas de formación profesional a distancia.'),
(5, 5, 5, 5, 'DiseñaBolivia', 'Red social para mostrar portfolios de diseñadores gráficos, ilustradores y artistas locales.'),
(6, 6, 6, 6, 'NoticiasLaPaz', 'Portal web de noticias para la ciudad de La Paz, con cobertura de eventos locales y nacionales.'),
(7, 7, 7, 7, 'DevBolivia', 'Comunidad en línea para desarrolladores de software, donde se pueden compartir proyectos y resolver dudas.'),
(2, 8, 8, 8, 'RedProfesional', 'Red social profesional para fortalecer la conexión entre empresas y talentos locales.'),
(1, 9, 9, 9, 'SonidoBolivia', 'Plataforma de streaming de música para artistas y músicos locales, con enfoque en la promoción de talentos nacionales.'),
(1, 10, 10, 10, 'ConsultoraAvanzada', 'Consultoría para empresas locales, enfocada en transformación digital y mejora de procesos.'),
(1, 1, 1, 11, 'TaxiLaPaz', 'Aplicación móvil para solicitar taxis en La Paz, con geolocalización y opciones de pago digital.'),
(2, 2, 2, 12, 'CulturaDigital', 'Plataforma digital para compartir y promover proyectos culturales y artísticos en Bolivia.');

-- Insertar registros en tbprojectdetails (detalles de los 12 proyectos)
INSERT INTO "tbprojectdetails" ("FK_project", "startDate", "endDate", "deploymentUrl", "cost", "estimatedTime", "githubUrl", "notionUrl", "figmaUrl") VALUES
(1, '2024-01-01', '2024-06-01', 'https://techbolivia.com', 50000.00, 12, 'https://github.com/techbolivia/techbolivia', 'https://www.notion.so/techbolivia', 'https://www.figma.com/techbolivia'),
(2, '2024-02-01', '2024-05-01', 'https://ecoenergia.bo', 30000.00, 10, 'https://github.com/ecoenergia/ecoenergia', 'https://www.notion.so/ecoenergia', 'https://www.figma.com/ecoenergia'),
(3, '2024-03-01', '2024-07-01', 'https://tiendamovil.bo', 40000.00, 11, 'https://github.com/tiendamovil/tiendamovil', 'https://www.notion.so/tiendamovil', 'https://www.figma.com/tiendamovil'),
(4, '2024-04-01', '2024-08-01', 'https://boliviaaprende.org', 15000.00, 8, 'https://github.com/boliviaaprende/boliviaaprende', 'https://www.notion.so/boliviaaprende', 'https://www.figma.com/boliviaaprende'),
(5, '2024-05-01', '2024-09-01', 'https://disenabolivia.com', 8000.00, 6, 'https://github.com/disenabolivia/disenabolivia', 'https://www.notion.so/disenabolivia', 'https://www.figma.com/disenabolivia'),
(6, '2024-06-01', '2024-12-01', 'https://noticiaslapaz.bo', 25000.00, 9, 'https://github.com/noticiaslapaz/noticiaslapaz', 'https://www.notion.so/noticiaslapaz', 'https://www.figma.com/noticiaslapaz'),
(7, '2024-07-01', '2024-11-01', 'https://devbolivia.org', 10000.00, 7, 'https://github.com/devbolivia/devbolivia', 'https://www.notion.so/devbolivia', 'https://www.figma.com/devbolivia'),
(8, '2024-08-01', '2025-01-01', 'https://redprofesional.bo', 20000.00, 10, 'https://github.com/redprofesional/redprofesional', 'https://www.notion.so/redprofesional', 'https://www.figma.com/redprofesional'),
(9, '2024-09-01', '2025-03-01', 'https://sonidobolivia.bo', 30000.00, 12, 'https://github.com/sonidobolivia/sonidobolivia', 'https://www.notion.so/sonidobolivia', 'https://www.figma.com/sonidobolivia'),
(10, '2024-10-01', '2025-04-01', 'https://consultoraavanzada.bo', 35000.00, 8, 'https://github.com/consultoraavanzada/consultoraavanzada', 'https://www.notion.so/consultoraavanzada', 'https://www.figma.com/consultoraavanzada'),
(11, '2024-11-01', '2025-05-01', 'https://taxilapaz.bo', 25000.00, 6, 'https://github.com/taxilapaz/taxilapaz', 'https://www.notion.so/taxilapaz', 'https://www.figma.com/taxilapaz'),
(12, '2024-12-01', '2025-06-01', 'https://culturadigital.bo', 15000.00, 9, 'https://github.com/culturadigital/culturadigital', 'https://www.notion.so/culturadigital', 'https://www.figma.com/culturadigital');
