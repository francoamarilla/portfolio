import { lazy, Suspense } from 'react'

// el detalle se carga aparte: la home no paga su código
const ProjectPage = lazy(() => import('./ProjectPage').then((m) => ({ default: m.ProjectPage })))

export function ProjectRoute() {
  return (
    <Suspense fallback={null}>
      <ProjectPage />
    </Suspense>
  )
}
