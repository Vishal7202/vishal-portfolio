import { useEffect, useState } from "react"
import Container from "../components/Container"
import ProjectCard from "../components/ProjectCard"

type Project = {
  _id: string
  name: string
  description: string
  image?: string
  tech: string[]
  live?: string
  github?: string
  status: string
}

export default function Projects() {

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/projects")

      if (!res.ok) {
        throw new Error("Failed to fetch projects")
      }

      const data = await res.json()

      //const list = Array.isArray(data) ? data : data.projects || []

      //const published = list.filter(
        //(p: Project) => p.status === "Published"
         setProjects(data)
      

      //setProjects(published)

    } catch (error) {

      console.error("Failed to load projects:", error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    fetchProjects()

  }, [])


  return (

    <section
      id="projects"
      className="relative py-28 md:py-36 overflow-hidden text-white"
    >

      <div className="absolute inset-0 bg-[#070916]" />

      <div className="absolute -left-40 top-20 w-[600px] h-[600px] bg-purple-700/20 blur-[160px] rounded-full" />

      <div className="absolute -right-40 bottom-20 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full" />

      <Container>

        <div className="relative z-10">

          {/* Header */}

          <div className="text-center mb-24">

            <p className="text-sm uppercase tracking-[0.4em] text-indigo-400 mb-6">
              Portfolio
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">

              Featured{" "}

              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Projects
              </span>

            </h2>

            <p className="max-w-2xl mx-auto mt-6 text-gray-400">
              A selection of applications I built using modern web technologies.
              These projects demonstrate my experience in full-stack development,
              REST API integration, authentication systems, and responsive UI design.
            </p>

            <div className="w-28 h-[3px] mx-auto mt-8 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg shadow-purple-600/40" />

          </div>


          {/* Loading */}

          {loading && (
            <p className="text-center text-gray-400">
              Loading projects...
            </p>
          )}


          {/* No Projects */}

          {!loading && projects.length === 0 && (
            <p className="text-center text-gray-400">
              No projects found.
            </p>
          )}


          {/* Grid */}

          {!loading && projects.length > 0 && (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">

              {projects.map((project) => {

                const isFeatured =
                  project.name.toLowerCase().includes("truthlens")

                return (

                  <ProjectCard
                    key={project._id}
                    title={project.name}
                    description={project.description}
                    image={
                    project.image
                      ? `http://localhost:5000/uploads/${project.image}`
                      : "/project1.jpg"
                  }
                    tech={project.tech}
                    liveLink={project.live || "#"}
                    githubLink={project.github || "#"}
                    featured={isFeatured}
                  />

                )

              })}

            </div>

          )}

        </div>

      </Container>

    </section>

  )

}