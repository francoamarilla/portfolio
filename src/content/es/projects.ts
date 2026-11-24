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
    challenges: [
      'Arquitectura híbrida escritorio–nube: un agente Java dentro de una aplicación Electron consulta el portal judicial desde las PC del estudio, y la nube (API, worker y base de datos) guarda los datos, reparte el trabajo y envía los avisos.',
      'Las credenciales y la sesión del portal judicial permanecen en las computadoras del estudio: la nube no almacena usuario, contraseña ni sesión, y cada PC vinculada usa un token propio y revocable.',
      'Aislamiento de datos por estudio con Row-Level Security en PostgreSQL, verificado con tests de integración multi-tenant sobre Testcontainers.',
      'Sincronización automatizada y en solo lectura de movimientos, cédulas y oficios, con cálculo de vencimientos en días hábiles según el calendario judicial de cada sede.',
    ],
    features: [
      'Gestión de expedientes judiciales.',
      'Administración de clientes.',
      'Agenda de actividades y vencimientos.',
      'Gestión de modelos de escritos.',
      'Sincronización automatizada de movimientos judiciales.',
    ],
    highlights: [
      'API en Java 21 y Spring Boot, worker para mails y calendario, y frontend en Angular.',
      'Persistencia en PostgreSQL con migraciones Flyway.',
      'Pipeline de GitHub Actions que ejecuta los tests de backend, frontend y escritorio antes de generar el instalador para Windows con actualizaciones automáticas.',
      'Sincronización con Google Calendar por usuario mediante OAuth y resumen diario por mail.',
    ],
    linksNote: 'El código principal es privado; el repositorio público reúne la documentación técnica del proyecto.',
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
    challenges: [
      'Integración de IA mediante tool calling: el asistente consulta disponibilidad y propone reservas, cancelaciones y reprogramaciones con herramientas tipadas, desde un microservicio en Python y FastAPI sin estado.',
      'El modelo propone y el backend decide: Spring Boot valida cada operación con sus reglas de negocio en dos pasos (preparar y confirmar), y la precisión del pedido la evalúa el código, no el modelo.',
      'Aislamiento multi-tenant con Row-Level Security en PostgreSQL: el negocio, la conversación y el cliente se obtienen del token y de la base de datos, nunca de lo que escribe el modelo.',
      'Evaluaciones automatizadas en CI (verificaciones deterministas y LLM-as-a-Judge), límites por IP y sesión, topes de gasto y un bot de botones como respaldo cuando la IA no está disponible.',
    ],
    features: [
      'Gestión de turnos y disponibilidad.',
      'Administración de profesionales y servicios.',
      'Dashboard de actividad y ventas.',
      'Asistente conversacional para la gestión de reservas.',
    ],
    highlights: [
      'Backend en Java 21 y Spring Boot 4, frontend en React y TypeScript, y servicio de IA en Python y FastAPI.',
      'Registro de cada turno del asistente: modelo, versión de prompt, tokens, costo y latencia.',
      'Configuración del asistente por negocio, con un playground para probarla antes de publicarla.',
      'Autenticación mediante JWT y migraciones de base de datos con Flyway.',
      'Demo pública desplegada en Vercel, Render y Neon.',
    ],
    linksNote:
      'Explorá el panel de administración con datos de ejemplo y probá el asistente de inteligencia artificial desde la propia aplicación.',
    results: {
      title: 'Evaluación del asistente',
      items: [
        '29 de 29 escenarios de evaluación superados.',
        'Costo promedio de USD 0,00054 por escenario evaluado.',
        'Duración promedio de 3,9 segundos por escenario.',
      ],
      note: 'Resultados de la batería documentada de 29 escenarios con un núcleo simulado. Cada escenario puede incluir varios turnos; no son métricas de producción y el costo puede excluir al evaluador.',
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
    challenges: [
      'Consistencia del inventario: ventas, anulaciones, compras y ajustes actualizan el stock en la capa de servicios, dentro de transacciones.',
      'Trazabilidad: cada cambio de stock registra un movimiento con su tipo, cantidad, usuario y existencias anterior y posterior.',
      'Control de concurrencia optimista con @Version: si dos operaciones modifican el mismo producto a la vez, una se rechaza en lugar de sobrescribir el stock.',
      'Autenticación JWT y autorización por roles (ADMIN y OPERADOR) aplicada en el backend con Spring Security; los productos se dan de baja lógica para conservar el historial.',
    ],
    features: [
      'Gestión de productos e inventario.',
      'Registro y administración de ventas.',
      'Actualización automática de existencias.',
      'Restitución de stock ante la cancelación de ventas.',
      'Compras a proveedores y cierre de caja diario por medio de pago.',
      'Historial y trazabilidad de movimientos.',
      'Administración de usuarios y permisos.',
    ],
    highlights: [
      'Backend en Java 21 y Spring Boot con arquitectura en capas: controladores, servicios y repositorios con Spring Data JPA.',
      'API REST documentada con Swagger/OpenAPI.',
      'Persistencia en PostgreSQL con migraciones Flyway.',
      'Interfaz web en React y TypeScript con TanStack Query.',
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
    challenges: [
      'Canal STOMP autenticado con el mismo JWT del panel: el token viaja en el frame CONNECT, solo el rol ADMIN puede conectarse y suscribirse, y el vencimiento se controla en cada frame.',
      'Los clientes no pueden enviar mensajes por el canal y los eventos solo transportan el id y el estado del pedido; el panel obtiene el detalle desde la API REST protegida.',
      'Los eventos se publican después del commit de la transacción, para no notificar pedidos que no llegaron a guardarse.',
      'El servidor recalcula los importes con los precios del catálogo y calcula el costo de envío según la distancia, dentro de un radio configurable.',
    ],
    features: [
      'Catálogo digital de productos.',
      'Carrito de compras y generación de pedidos.',
      'Panel de administración.',
      'Gestión de estados de pedidos.',
      'Notificaciones en tiempo real.',
    ],
    highlights: [
      'Backend en Java 21 y Spring Boot; tienda y panel en Angular con TypeScript.',
      'Persistencia en PostgreSQL con migraciones Flyway.',
      'Pruebas unitarias y de integración con JUnit 5, Mockito y Spring Boot Test, incluida la seguridad del canal STOMP, y specs de Vitest para el panel.',
      'Contenedorización con Docker Compose y nginx.',
    ],
    results: {
      title: 'Estado',
      items: [
        'Proyecto de portfolio sin uso comercial. Estuvo desplegado en un VPS Linux con Docker Compose y HTTPS; actualmente no está en línea.',
      ],
    },
    galleryAlt: ['Panel: gestión de la carta', 'Panel: ofertas', 'Panel: informes de ventas'],
  },
}
