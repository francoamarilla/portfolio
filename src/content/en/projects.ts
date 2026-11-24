import type { ProjectCopy, ProjectSlug } from '../../types/content'

/** Project copy in English. Keep in sync with es/projects.ts: same facts, natural phrasing. */
export const projects: Record<ProjectSlug, ProjectCopy> = {
  causario: {
    subtitle: 'Case management system for law firms.',
    summary:
      'Case management system for law firms that brings together case files, clients, scheduling and document templates, and automates the retrieval of court updates.',
    problem:
      'Managing case files and manually checking court updates creates repetitive work and makes it hard for law firms to keep their information in one place.',
    solution:
      'A complete legal practice management platform with a desktop app that automatically retrieves and syncs case updates from the Córdoba Judiciary Extranet.',
    features: [
      'Court case management.',
      'Client management.',
      'Calendar for activities and deadlines.',
      'Document template management.',
      'Automated sync of court updates.',
    ],
    highlights: [
      'Java 21 and Spring Boot API, a worker for emails and calendar sync, and a Java agent that runs on the firm’s own PC.',
      'Data persistence with PostgreSQL and schema migrations with Flyway.',
      'Electron desktop app that hosts the agent and queries the court portal read-only from the firm’s PC.',
      'Automated retrieval and sync of court updates.',
      'CI/CD pipeline with GitHub Actions.',
      'Windows installers with automatic updates.',
    ],
    results: {
      title: 'Validation',
      items: ['Pilot deployment at a three-lawyer firm in Córdoba.'],
    },
    galleryAlt: [
      'Case file list',
      'Case file detail with its timeline',
      'Deadline calendar, list view',
      'Calendar view',
      'Document templates',
    ],
  },
  recepta: {
    subtitle: 'AI-powered appointment booking platform.',
    summary:
      'Appointment booking platform with an AI conversational assistant that checks availability and manages bookings through tool calling.',
    problem:
      'Managing appointments by hand takes time and makes coordination between clients, staff and businesses harder.',
    solution:
      'An appointment booking platform with a Claude-based conversational assistant that operates the system’s features through natural language.',
    features: [
      'Appointment and availability management.',
      'Staff and service management.',
      'Activity and sales dashboard.',
      'Conversational assistant for bookings.',
    ],
    highlights: [
      'AI microservice built with Python and FastAPI.',
      'LLM integration through tool calling.',
      'Operations and business rules validated by the backend.',
      'Automated evaluations with LLM-as-a-Judge and deterministic checks.',
      'Usage control, rate limits and AI budget caps.',
      'JWT authentication and data isolation with Row-Level Security.',
    ],
    results: {
      title: 'Assistant evaluation',
      items: [
        '29 of 29 evaluation scenarios passed.',
        'Average cost of USD 0.00054 per evaluated scenario.',
        'Average duration of 3.9 seconds per scenario.',
      ],
      note: 'Results from 29 documented scenarios using a simulated core. A scenario may include multiple turns; these are not production metrics, and cost may exclude the judge.',
    },
    galleryAlt: ['Business statistics', 'AI assistant settings', 'Dashboard home with the day overview'],
  },
  acopio: {
    subtitle: 'Inventory and sales management system.',
    summary:
      'Inventory and sales management system that brings together stock, sales and movement tracking, with role-based access control.',
    problem:
      'Managing inventory and sales by hand makes it hard to control stock, trace operations and keep sales data consistent.',
    solution:
      'A sales management platform that centralizes inventory and sales and applies business rules to keep stock consistent.',
    features: [
      'Product and inventory management.',
      'Sales recording and management.',
      'Automatic stock updates.',
      'Stock restored when a sale is cancelled.',
      'Movement history and traceability.',
      'User and permission management.',
    ],
    highlights: [
      'Backend architecture built on Java and Spring Boot.',
      'REST API design and implementation.',
      'Business rule validation to keep inventory consistent.',
      'JWT authentication and role-based authorization.',
      'PostgreSQL persistence with Flyway migrations.',
      'Web interface built with React and TypeScript.',
    ],
    galleryAlt: ['Stock movement history', 'Sales list', 'Products with stock and margins'],
  },
  sticky: {
    subtitle: 'Online ordering system.',
    summary:
      'Online ordering system for food businesses, with a product catalog, order management and real-time notifications over WebSockets.',
    problem:
      'Handling food orders by hand makes coordination between customers and the business harder, and operations difficult to track.',
    solution:
      'A web platform that digitizes the ordering process, from product selection to order intake and management by the business.',
    features: [
      'Digital product catalog.',
      'Shopping cart and order placement.',
      'Admin panel.',
      'Order status management.',
      'Real-time notifications.',
    ],
    highlights: [
      'Full stack architecture built on Java, Spring Boot and Angular.',
      'Real-time communication over WebSockets and STOMP.',
      'JWT authentication and authorization.',
      'Order totals validated and recalculated by the backend.',
      'Automated tests with JUnit and Mockito.',
      'Containerized with Docker Compose.',
      'Deployed on a Linux VPS with HTTPS.',
    ],
    galleryAlt: ['Admin: menu management', 'Admin: offers', 'Admin: sales reports'],
  },
}
