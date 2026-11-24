import { lazy, Suspense } from 'react'

// el detalle se carga aparte: la home no paga su código
const ProjectPage = lazy(() => import('./ProjectPage').then((m) => ({ default: m.ProjectPage })))

export function ProjectRoute() {
  return (
    // el fallback ocupa la pantalla: mientras llega el chunk, el footer no se dibuja arriba para después saltar (CLS)
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <ProjectPage />
    </Suspense>
  )
}
