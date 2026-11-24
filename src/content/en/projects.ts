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
    challenges: [
      'Hybrid desktop–cloud architecture: a Java agent inside an Electron app queries the court portal from the firm’s own PCs, while the cloud (API, worker and database) stores the data, hands out the work and sends notifications.',
      'Court portal credentials and sessions stay on the firm’s computers: the cloud never stores the username, password or session, and each linked PC uses its own revocable token.',
      'Per-firm data isolation with PostgreSQL Row-Level Security, verified by multi-tenant integration tests on Testcontainers.',
      'Automated, read-only sync of court updates, notices and official letters, with deadlines calculated in business days using each court venue’s judicial calendar.',
    ],
    features: [
      'Court case management.',
      'Client management.',
      'Calendar for activities and deadlines.',
      'Document template management.',
      'Automated sync of court updates.',
    ],
    highlights: [
      'Java 21 and Spring Boot API, a worker for emails and calendar sync, and an Angular frontend.',
      'PostgreSQL persistence with Flyway migrations.',
      'GitHub Actions pipeline that runs the backend, frontend and desktop tests before building the Windows installer with automatic updates.',
      'Per-user Google Calendar sync through OAuth and a daily email digest.',
    ],
    linksNote: 'The main source code is private; the public repository holds the project’s technical documentation.',
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
    challenges: [
      'AI integration through tool calling: the assistant checks availability and proposes bookings, cancellations and reschedules with typed tools, from a stateless Python and FastAPI microservice.',
      'The model proposes, the backend decides: Spring Boot validates every operation against its business rules in two steps (prepare and commit), and the code, not the model, judges how precise the request is.',
      'Multi-tenant isolation with PostgreSQL Row-Level Security: the business, conversation and customer come from the token and the database, never from what the model writes.',
      'Automated evaluations in CI (deterministic checks and LLM-as-a-Judge), per-IP and per-session limits, spending caps, and a button-based bot as a fallback when the AI is unavailable.',
    ],
    features: [
      'Appointment and availability management.',
      'Staff and service management.',
      'Activity and sales dashboard.',
      'Conversational assistant for bookings.',
    ],
    highlights: [
      'Java 21 and Spring Boot 4 backend, React and TypeScript frontend, and a Python and FastAPI AI service.',
      'Every assistant turn is logged: model, prompt version, tokens, cost and latency.',
      'Per-business assistant settings, with a playground to test them before publishing.',
      'JWT authentication and Flyway database migrations.',
      'Public demo deployed on Vercel, Render and Neon.',
    ],
    linksNote: 'Explore the admin dashboard with sample data and try the AI assistant right inside the app.',
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
    challenges: [
      'Inventory consistency: sales, cancellations, purchases and adjustments update stock in the service layer, inside transactions.',
      'Traceability: every stock change records a movement with its type, quantity, user, and the stock before and after.',
      'Optimistic concurrency control with @Version: if two operations change the same product at once, one is rejected instead of overwriting the stock.',
      'JWT authentication and role-based authorization (ADMIN and OPERADOR) enforced in the backend with Spring Security; products are soft-deleted to keep their history.',
    ],
    features: [
      'Product and inventory management.',
      'Sales recording and management.',
      'Automatic stock updates.',
      'Stock restored when a sale is cancelled.',
      'Supplier purchases and daily cash closing by payment method.',
      'Movement history and traceability.',
      'User and permission management.',
    ],
    highlights: [
      'Java 21 and Spring Boot backend with a layered architecture: controllers, services and Spring Data JPA repositories.',
      'REST API documented with Swagger/OpenAPI.',
      'PostgreSQL persistence with Flyway migrations.',
      'React and TypeScript web interface with TanStack Query.',
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
    challenges: [
      'STOMP channel authenticated with the admin panel’s own JWT: the token travels in the CONNECT frame, only the ADMIN role can connect and subscribe, and expiry is checked on every frame.',
      'Customers cannot send messages over the channel, and events carry only the order id and status; the panel fetches the details from the protected REST API.',
      'Events are published after the transaction commits, so no notification goes out for an order that was never saved.',
      'The server recalculates totals from catalog prices and computes the delivery fee by distance, within a configurable radius.',
    ],
    features: [
      'Digital product catalog.',
      'Shopping cart and order placement.',
      'Admin panel.',
      'Order status management.',
      'Real-time notifications.',
    ],
    highlights: [
      'Java 21 and Spring Boot backend; storefront and admin panel in Angular with TypeScript.',
      'PostgreSQL persistence with Flyway migrations.',
      'Unit and integration tests with JUnit 5, Mockito and Spring Boot Test, including STOMP channel security, plus Vitest specs for the panel.',
      'Containerized with Docker Compose and nginx.',
    ],
    results: {
      title: 'Status',
      items: [
        'Portfolio project with no commercial use. It was previously deployed on a Linux VPS with Docker Compose and HTTPS; it is currently offline.',
      ],
    },
    galleryAlt: ['Admin: menu management', 'Admin: offers', 'Admin: sales reports'],
  },
}
