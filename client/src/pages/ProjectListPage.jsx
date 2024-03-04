import { useState, useEffect } from "react"
import ProjectCard from "../components/ProjectCard"
import AddProject from "../components/AddProject"
import projectServices from "../services/project.services"

function ProjectListPage() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = () => {
    projectServices
      .getAllProjects()
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error))
  }

  return (
    <div className="ProjectListPage">

      <AddProject refreshProjects={getAllProjects} />

      {
        projects.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))
      }
    </div>
  )
}

export default ProjectListPage
