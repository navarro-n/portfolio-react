import MainLayout from "../layouts/MainLayout"
import Hero from "../components/Hero/Hero"
import ProjectsList from "../components/ProjectsList/ProjectsList"
import About from "../components/About/About"   // <- default import
import Contact from "../components/Contact/Contact"

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <ProjectsList />
      <About />
      <Contact />
    </MainLayout>
  )
}