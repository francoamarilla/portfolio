import type { ProjectCopy, ProjectSlug } from '../../types/content'

/** Textos de proyectos en español. Contenido aprobado: no agregar datos sin confirmar. */
export const projects: Record<ProjectSlug, ProjectCopy> = {
  causario: {
    subtitle: 'Sistema de gestión para estudios jurídicos.',
    summary:
      'Sistema de gestión para estudios jurídicos que centraliza expedientes, clientes, agenda y modelos de escritos, automatizando la consulta de movimientos judiciales.',
    problem:
      'La gestión de expedientes y la consulta manual de movimientos judiciales generan tareas repetitivas y dificultan la centralización de la información en los estudios jurídicos.',
    solution:
      'Desarrollo de una plataforma integral de gestión jurídica con una aplicación de escritorio que automatiza la consulta y sincronización de movimientos desde la Extranet del Poder Judicial de Córdoba.',
    features: [
      'Gestión de expedientes judiciales.',
      'Administración de clientes.',
      'Agenda de actividades y vencimientos.',
      'Gestión de modelos de escritos.',
      'Sincronización automatizada de movimientos judiciales.',
    ],
    highlights: [
      'API en Java 21 y Spring Boot, un worker para mails y calendario, y un agente en Java que corre en la PC del estudio.',
      'Persistencia de datos mediante PostgreSQL y gestión de migraciones con Flyway.',
      'Aplicación de escritorio en Electron que aloja al agente y consulta el portal en solo lectura desde la PC del estudio.',
      'Automatización de consultas y sincronización de movimientos judiciales.',
      'Pipeline CI/CD mediante GitHub Actions.',
      'Generación de instaladores para Windows y actualizaciones automáticas.',
    ],
    results: {
      title: 'Validación',
      items: ['Implementación piloto en un estudio jurídico de Córdoba integrado por tres profesionales.'],
    },
    galleryAlt: [
      'Listado de expedientes',
      'Detalle de un expediente con su línea de tiempo',
      'Agenda de vencimientos en lista',
      'Agenda en vista calendario',
      'Modelos de escritos',
    ],
  },
  recepta: {
    subtitle: 'Plataforma de gestión de turnos con IA.',
    summary:
      'Plataforma de gestión de turnos con un asistente conversacional basado en inteligencia artificial, capaz de consultar disponibilidad y gestionar reservas mediante tool calling.',
    problem:
      'La gestión manual de turnos consume tiempo y dificulta la coordinación entre clientes, profesionales y establecimientos.',
    solution:
      'Desarrollo de una plataforma de gestión de turnos que integra un asistente conversacional basado en Claude, capaz de interactuar con las funcionalidades del sistema mediante lenguaje natural.',
    features: [
      'Gestión de turnos y disponibilidad.',
      'Administración de profesionales y servicios.',
      'Dashboard de actividad y ventas.',
      'Asistente conversacional para la gestión de reservas.',
    ],
    highlights: [
      'Microservicio de inteligencia artificial desarrollado con Python y FastAPI.',
      'Integración de LLMs mediante tool calling.',
      'Validación de operaciones y reglas de negocio desde el backend.',
      'Evaluaciones automatizadas mediante LLM-as-a-Judge y verificaciones deterministas.',
      'Control de consumo, límites de solicitudes y presupuesto de IA.',
      'Autenticación mediante JWT y aislamiento de datos mediante Row-Level Security.',
    ],
    results: {
      title: 'Evaluación del asistente',
      items: [
        '29 de 29 escenarios de evaluación superados.',
        'Coste promedio de USD 0,00054 por interacción evaluada.',
        'Latencia promedio de 3,9 segundos.',
      ],
      note: 'Resultados de la batería de evaluaciones documentada en el repositorio; no son métricas de producción.',
    },
    galleryAlt: ['Estadísticas del negocio', 'Configuración del asistente de IA', 'Inicio del panel con el resumen del día'],
  },
  acopio: {
    subtitle: 'Sistema de gestión de stock y ventas.',
    summary:
      'Sistema de gestión de stock y ventas que centraliza el inventario, las operaciones comerciales y la trazabilidad de movimientos, incorporando control de acceso basado en roles.',
    problem:
      'La gestión manual de inventarios y ventas dificulta el control de existencias, la trazabilidad de operaciones y la consistencia de la información comercial.',
    solution:
      'Plataforma de gestión comercial que centraliza el inventario y las ventas, aplicando reglas de negocio para mantener la consistencia del stock.',
    features: [
      'Gestión de productos e inventario.',
      'Registro y administración de ventas.',
      'Actualización automática de existencias.',
      'Restitución de stock ante la cancelación de ventas.',
      'Historial y trazabilidad de movimientos.',
      'Administración de usuarios y permisos.',
    ],
    highlights: [
      'Arquitectura backend basada en Java y Spring Boot.',
      'Diseño e implementación de API REST.',
      'Validación de reglas de negocio para garantizar la consistencia del inventario.',
      'Autenticación mediante JWT y autorización basada en roles.',
      'Persistencia en PostgreSQL y gestión de migraciones mediante Flyway.',
      'Interfaz web desarrollada con React y TypeScript.',
    ],
    galleryAlt: ['Historial de movimientos de stock', 'Listado de ventas', 'Productos con stock y márgenes'],
  },
  sticky: {
    subtitle: 'Sistema de pedidos online.',
    summary:
      'Sistema de pedidos online para establecimientos gastronómicos, con catálogo de productos, gestión de pedidos y notificaciones en tiempo real mediante WebSockets.',
    problem:
      'La gestión manual de pedidos gastronómicos dificulta la coordinación entre clientes y establecimientos, así como el seguimiento de las operaciones.',
    solution:
      'Plataforma web que digitaliza el proceso de pedidos, desde la selección de productos hasta su recepción y administración por parte del establecimiento.',
    features: [
      'Catálogo digital de productos.',
      'Carrito de compras y generación de pedidos.',
      'Panel de administración.',
      'Gestión de estados de pedidos.',
      'Notificaciones en tiempo real.',
    ],
    highlights: [
      'Arquitectura Full Stack basada en Java, Spring Boot y Angular.',
      'Comunicación en tiempo real mediante WebSockets y STOMP.',
      'Autenticación y autorización mediante JWT.',
      'Validación y recálculo de importes de pedidos desde el backend.',
      'Pruebas automatizadas mediante JUnit y Mockito.',
      'Contenedorización mediante Docker Compose.',
      'Despliegue en un servidor VPS Linux con HTTPS.',
    ],
    galleryAlt: ['Panel: gestión de la carta', 'Panel: ofertas', 'Panel: informes de ventas'],
  },
}
