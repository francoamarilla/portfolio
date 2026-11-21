import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Education } from '../components/Education'
import { Hero } from '../components/Hero'
import { ProjectsSection } from '../components/projects/ProjectsSection'
import { TechStack } from '../components/TechStack'
import { content } from '../content'

const { meta } = content.ui

export function Home() {
  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <Hero />
      <About />
      <ProjectsSection />
      <TechStack />
      <Education />
      <Contact />
    </>
  )
}
