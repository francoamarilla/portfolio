import { Outlet, ScrollRestoration } from 'react-router'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export function Layout() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      {/* también resuelve los anclas: /#projects hace scroll a la sección */}
      <ScrollRestoration />
    </>
  )
}
