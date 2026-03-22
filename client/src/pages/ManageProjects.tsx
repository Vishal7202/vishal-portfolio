import { Plus, Trash2, Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type Project = {
  _id: string
  name: string
  description?: string
  tech: string[]
  status: string
  createdAt: string
  github?: string
  live?: string
}

export default function ManageProjects() {

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tech: "",
    status: "Draft",
    github: "",
    live: "",
    image: null as File | null
  })

 const resetForm = () => {
  setFormData({
    name: "",
    description: "",
    tech: "",
    status: "Draft",
    github: "",
    live: "",
    image: null
  })
  setEditingId(null)
}

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects")
      const data = await res.json()
      setProjects(data)
    } catch {
      toast.error("Failed to load projects")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // DELETE
  const deleteProject = async (id: string) => {

    if (!confirm("Delete this project?")) return

    try {

      await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE"
      })

      toast.success("Project deleted")
      fetchProjects()

    } catch {

      toast.error("Delete failed")

    }

  }

  // EDIT
  const editProject = (project: Project) => {

    setEditingId(project._id)

setFormData({
  name: project.name,
  description: project.description || "",
  tech: project.tech.join(","),
  status: project.status,
  github: project.github || "",
  live: project.live || "",
  image: null
})
    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  }

  // SAVE (ADD + UPDATE)
 const saveProject = async () => {

  const payload = new FormData()

  payload.append("name", formData.name)
  payload.append("description", formData.description)
  payload.append("tech", JSON.stringify(formData.tech.split(",")))
  payload.append("status", formData.status)
  payload.append("github", formData.github)
  payload.append("live", formData.live)

  if (formData.image) {
    payload.append("image", formData.image)
  }

  try {

    if (editingId) {

      await fetch(`http://localhost:5000/api/projects/${editingId}`, {
        method: "PUT",
        body: payload
      })

      toast.success("Project updated")

    } else {

      await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        body: payload
      })

      toast.success("Project added")

    }

    resetForm()
    setShowForm(false)
    fetchProjects()

  } catch {

    toast.error("Save failed")

  }

}

  return (

    <div className="w-full px-4 md:px-8 pb-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <h1 className="text-2xl md:text-3xl font-bold">
          Manage Projects
        </h1>

        <button
          onClick={() => {
          resetForm()
          setShowForm(true)
        }}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
        >
          <Plus size={18} />
          Add Project
        </button>

      </div>

      {/* FORM */}
      {showForm && (

        <div className="bg-[#0d1117] border border-gray-800 p-6 rounded-2xl mb-8">

          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Project Name"
              className="bg-[#161b22] border border-gray-700 p-3 rounded-lg"
              value={formData.name}
              onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />
            <input
  type="text"
  placeholder="Project Description"
  className="bg-[#161b22] border border-gray-700 p-3 rounded-lg md:col-span-2"
  value={formData.description}
  onChange={(e)=>setFormData({...formData,description:e.target.value})}
/>

            <input
              type="text"
              placeholder="Tech (React,Node,Mongo)"
              className="bg-[#161b22] border border-gray-700 p-3 rounded-lg"
              value={formData.tech}
              onChange={(e)=>setFormData({...formData,tech:e.target.value})}
            />

            <input
              type="text"
              placeholder="GitHub Link"
              className="bg-[#161b22] border border-gray-700 p-3 rounded-lg"
              value={formData.github}
              onChange={(e)=>setFormData({...formData,github:e.target.value})}
            />

            <input
              type="text"
              placeholder="Live Link"
              className="bg-[#161b22] border border-gray-700 p-3 rounded-lg"
              value={formData.live}
              onChange={(e)=>setFormData({...formData,live:e.target.value})}
            />

            <select
              className="bg-[#161b22] border border-gray-700 p-3 rounded-lg md:col-span-2"
              value={formData.status}
              onChange={(e)=>setFormData({...formData,status:e.target.value})}
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
            <input
  type="file"
  accept="image/*"
  className="bg-[#161b22] border border-gray-700 p-3 rounded-lg md:col-span-2"
  onChange={(e)=>
    setFormData({
      ...formData,
      image: e.target.files ? e.target.files[0] : null
    })
  }
/>

          </div>

          <div className="flex gap-3 mt-6">

            <button
              onClick={saveProject}
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
            >
              {editingId ? "Update Project" : "Save Project"}
            </button>

            <button
              onClick={() => {
                setShowForm(false)
                resetForm()
              }}
              className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </div>

      )}

      {/* TABLE */}
      <div className="bg-[#0d1117] border border-gray-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#161b22] text-gray-400 text-sm">
            <tr>
              <th className="px-6 py-4 text-left">Project</th>
              <th className="px-6 py-4 text-left">Tech</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td className="px-6 py-6">Loading...</td>
              </tr>

            ) : (

              projects.map(project => (

                <tr key={project._id} className="border-t border-gray-800">

                  <td className="px-6 py-4 text-white">{project.name}</td>

                  <td className="px-6 py-4 text-gray-400">
                    {project.tech.join(", ")}
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {project.status}
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => editProject(project)}
                        className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"
                      >
                        <Pencil size={16}/>
                      </button>

                      <button
                        onClick={()=>deleteProject(project._id)}
                        className="p-2 bg-red-500/10 text-red-400 rounded-lg"
                      >
                        <Trash2 size={16}/>
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}