import { Plus, X } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type Project = {
  _id: string
  name: string
  description?: string
  tech: string[]
  status: string
  createdAt: string
  updatedAt?: string
  github?: string
  live?: string
}

export default function ManageProjects() {

const [projects,setProjects] = useState<Project[]>([])
const [loading,setLoading] = useState(true)

const formatDate = (date:string)=>{
  return new Date(date).toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"2-digit",
    year:"numeric",
    timeZone:"Asia/Kolkata"
  })
}

const timeAgo = (date:string)=>{

const seconds = Math.floor(
(new Date().getTime() - new Date(date).getTime()) / 1000
)

const intervals = [
{ label:"year", seconds:31536000 },
{ label:"month", seconds:2592000 },
{ label:"day", seconds:86400 },
{ label:"hour", seconds:3600 },
{ label:"minute", seconds:60 }
]

for(const interval of intervals){

const count = Math.floor(seconds / interval.seconds)

if(count >= 1){
return `${count} ${interval.label}${count>1?"s":""} ago`
}

}

return "just now"

}

const [showModal,setShowModal] = useState(false)
const [editId,setEditId] = useState<string | null>(null)

const [formData,setFormData] = useState({
  name:"",
  description:"",
  tech:"",
  status:"Draft",
  github:"",
  live:"",
  featured:false
})

/* FETCH PROJECTS */

const fetchProjects = async()=>{

try{

setLoading(true)

const res = await fetch("http://localhost:5000/api/projects")

const data = await res.json()

setProjects(
data.sort(
(a:Project,b:Project)=>
new Date(b.updatedAt || b.createdAt).getTime() -
new Date(a.updatedAt || a.createdAt).getTime()
)
)

}catch(err){

console.error(err)
toast.error("Failed to load projects")

}finally{

setLoading(false)

}

}

useEffect(()=>{

fetchProjects()

},[])



/* DELETE */

const deleteProject = async(id:string)=>{

if(!confirm("Delete this project?")) return

try{

await fetch(`http://localhost:5000/api/projects/${id}`,{
method:"DELETE"
})

toast.success("Project deleted")

fetchProjects()

}catch{

toast.error("Delete failed")

}

}



/* EDIT */

const openEdit = (project:Project)=>{

setEditId(project._id)

setFormData({
name:project.name,
description:project.description || "",
tech:project.tech.join(", "),
status:project.status,
github:project.github || "",
live:project.live || "",
featured:false
})

setShowModal(true)

}



/* SAVE */

const saveProject = async()=>{

try{

const body = {
...formData,
tech:formData.tech.split(",").map(t=>t.trim())
}

let res

if(editId){

res = await fetch(
`http://localhost:5000/api/projects/${editId}`,
{
method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(body)
}
)

toast.success("Project updated")

}else{

res = await fetch(
"http://localhost:5000/api/projects",
{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(body)
}
)

toast.success("Project added")

}

if(!res.ok) throw new Error()

setShowModal(false)
setEditId(null)

setFormData({
name:"",
description:"",
tech:"",
status:"Draft",
github:"",
live:"",
featured:false
})

fetchProjects()

}catch{

toast.error("Save failed")

}

}



/* UI */

return(

<div className="w-full p-4 md:p-6">

{/* HEADER */}

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

<div>

<h1 className="text-3xl font-bold text-white">
Manage Projects
</h1>

<p className="text-gray-400 text-sm mt-1">
Add, edit or delete your portfolio projects
</p>

</div>

<button
onClick={()=>{
setEditId(null)
setFormData({
name:"",
description:"",
tech:"",
status:"Draft",
github:"",
live:"",
featured:false
})
setShowModal(true)
}}

className="flex items-center justify-center gap-2 text-white bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 rounded-xl font-semibold hover:scale-105 transition"

>

<Plus size={18}/>
Add Project

</button>

</div>



{/* TABLE */}

<div className="bg-[#0d1117] border border-gray-800 rounded-2xl overflow-x-auto">


<table className="min-w-[1100px] w-full">
<thead className="bg-[#161b22] text-gray-400 text-sm">

<tr>

<th className="text-left px-6 py-4">Project</th>
<th className="text-left px-6 py-4">Tech</th>
<th className="text-left px-6 py-4">Status</th>
<th className="text-left px-6 py-4">Created</th>
<th className="text-left px-6 py-4">Updated</th>
<th className="text-right px-6 py-4 min-w-[200px]">Actions</th>

</tr>

</thead>

<tbody>

{loading ? (

<tr>

<td colSpan={6} className="px-6 py-6 text-center text-gray-400">
Loading projects...
</td>

</tr>

) : projects.length === 0 ? (

<tr>

<td colSpan={6} className="px-6 py-10 text-center text-gray-500">
No projects found
</td>

</tr>

) : (

projects.map(project=>(

<tr
key={project._id}
className="border-t border-gray-800 hover:bg-[#161b22]/60 transition"
>

<td className="px-6 py-4 text-white font-medium">
{project.name}
</td>

<td className="px-6 py-4 text-gray-400">
{project.tech.join(", ")}
</td>

<td className="px-6 py-4">

<span
className={`px-3 py-1 text-xs rounded-full font-medium
${project.status === "Published"
? "bg-green-500/20 text-green-400"
: "bg-yellow-500/20 text-yellow-400"
}`}
>

{project.status}

</span>

</td>

<td className="px-6 py-4 text-gray-400">
{formatDate(project.createdAt)}
</td>

<td className="px-6 py-4 text-gray-400">

<div className="flex flex-col">

<span>
{formatDate(project.updatedAt || project.createdAt)}
</span>

<span className="text-xs text-gray-500">
Edited {timeAgo(project.updatedAt || project.createdAt)}
</span>

</div>

</td>

<td className="px-6 py-4 text-right whitespace-nowrap">

<div className="flex items-center justify-end gap-3">

<button
onClick={()=>openEdit(project)}
className="bg-yellow-500 text-black px-3 py-1 rounded"
>
EDIT
</button>

<button
onClick={()=>deleteProject(project._id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
DELETE
</button>

</div>

</td>

</tr>

))

)}

</tbody>

</table>

</div>



{/* MODAL */}

{showModal && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">

<div className="bg-[#0d1117] border border-gray-800 rounded-2xl w-full max-w-xl p-6">

<div className="flex justify-between items-center mb-6">

<h2 className="text-xl font-bold text-white">
{editId ? "Edit Project" : "Add Project"}
</h2>

<button onClick={()=>setShowModal(false)}>
<X size={20}/>
</button>

</div>

<div className="space-y-4">

<input
placeholder="Project Name"
value={formData.name}
onChange={(e)=>setFormData({...formData,name:e.target.value})}
className="w-full bg-[#161b22] border border-gray-700 rounded-lg px-4 py-2"
/>

<textarea
placeholder="Project Description"
value={formData.description}
onChange={(e)=>setFormData({...formData,description:e.target.value})}
className="w-full bg-[#161b22] border border-gray-700 rounded-lg px-4 py-2"
/>

<input
placeholder="Tech (React, Node, MongoDB)"
value={formData.tech}
onChange={(e)=>setFormData({...formData,tech:e.target.value})}
className="w-full bg-[#161b22] border border-gray-700 rounded-lg px-4 py-2"
/>

<input
placeholder="Github Link"
value={formData.github}
onChange={(e)=>setFormData({...formData,github:e.target.value})}
className="w-full bg-[#161b22] border border-gray-700 rounded-lg px-4 py-2"
/>

<input
placeholder="Live Link"
value={formData.live}
onChange={(e)=>setFormData({...formData,live:e.target.value})}
className="w-full bg-[#161b22] border border-gray-700 rounded-lg px-4 py-2"
/>

<select
value={formData.status}
onChange={(e)=>setFormData({...formData,status:e.target.value})}
className="w-full bg-[#161b22] border border-gray-700 rounded-lg px-4 py-2"
>

<option value="Draft">Draft</option>
<option value="Published">Published</option>

</select>

</div>

<button
onClick={saveProject}
className="mt-6 w-full text-white bg-gradient-to-r from-indigo-500 to-purple-600 py-2 rounded-xl font-semibold hover:scale-105 transition"
>

Save Project

</button>

</div>

</div>

)}

</div>
)

}