import { Save, Upload, Trash } from "lucide-react"

import { useEffect, useState } from "react"
import axios from "axios"

type SettingsType = {
name:string
email:string
role:string
location:string
portfolioTitle:string
tagline:string
bio:string
github:string
linkedin:string
twitter:string
metaTitle:string
metaDescription:string
contactEmail:string
skills:string
theme:string
visibility:string
password:string
}

export default function Settings(){

const [form,setForm] = useState<SettingsType>({
name:"",
email:"",
role:"",
location:"",
portfolioTitle:"",
tagline:"",
bio:"",
github:"",
linkedin:"",
twitter:"",
metaTitle:"",
metaDescription:"",
contactEmail:"",
skills:"",
theme:"dark",
visibility:"public",
password:""
})

const [profileImage,setProfileImage] = useState<File | null>(null)
const [resume,setResume] = useState<File | null>(null)

const [preview,setPreview] = useState("")
const [resumeName,setResumeName] = useState("")
const [loading,setLoading] = useState(false)


useEffect(()=>{
fetchSettings()
},[])

const fetchSettings = async()=>{

try{

const res = await axios.get("https://vishal-portfolio-xud3.onrender.com/api/settings")

setForm({...form,...res.data})

if(res.data.profileImage){
setPreview("http://localhost:5000/uploads/"+res.data.profileImage)
}

if(res.data.resume){
setResumeName(res.data.resume)
}

}catch(err){
console.log(err)
}

}

const handleChange = (e:any)=>{

setForm({
...form,
[e.target.name]:e.target.value
})

}

const handleImage = (e:any)=>{

const file = e.target.files[0]
if(!file) return

setProfileImage(file)
setPreview(URL.createObjectURL(file))

}

const handleResume = (e:any)=>{

const file = e.target.files[0]

if(!file) return

if(file.type !== "application/pdf"){
alert("Only PDF allowed")
return
}

setResume(file)
setResumeName(file.name)

}

const saveSettings = async()=>{

try{

setLoading(true)

const formData = new FormData()

Object.keys(form).forEach((key)=>{
formData.append(key,(form as any)[key])
})

if(profileImage){
formData.append("profileImage",profileImage)
}

if(resume){
formData.append("resume",resume)
}

await axios.put(
"https://vishal-portfolio-xud3.onrender.com/api/settings",
formData
)
alert("✅ Settings Updated Successfully")

}catch(err){

console.log(err)
alert("❌ Failed to update settings")

}finally{
setLoading(false)
}

}

const deleteAccount = ()=>{

const confirmDelete = confirm("Are you sure you want to delete portfolio?")

if(confirmDelete){
alert("Account delete API call here")
}

}

return(

<div className="w-full min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] p-6 text-white">

<h1 className="text-3xl font-bold mb-8">
Portfolio Settings
</h1>


<div className="grid lg:grid-cols-3 gap-8">

{/* PROFILE */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

<h2 className="text-lg font-semibold mb-6">
Profile Photo
</h2>

<div className="flex flex-col items-center gap-4">

<img
src={preview || "https://ui-avatars.com/api/?name=Admin"}
className="w-28 h-28 rounded-full border-2 border-indigo-500"
/>

<label className="flex items-center gap-2 text-sm bg-indigo-600 px-4 py-2 rounded-lg cursor-pointer">

<Upload size={16}/>
Upload Photo

<input
type="file"
hidden
onChange={handleImage}
/>

</label>

</div>

</div>


{/* RIGHT SIDE */}

<div className="lg:col-span-2 space-y-8">


{/* BASIC INFO */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

<h2 className="text-lg font-semibold mb-6">
Basic Information
</h2>

<div className="grid md:grid-cols-2 gap-6">

<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="Full Name"
className="input"
/>

<input
name="email"
value={form.email}
onChange={handleChange}
placeholder="Email"
className="input"
/>

<input
name="role"
value={form.role}
onChange={handleChange}
placeholder="Role"
className="input"
/>

<input
name="location"
value={form.location}
onChange={handleChange}
placeholder="Location"
className="input"
/>

</div>

</div>


{/* PORTFOLIO */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

<h2 className="text-lg font-semibold">
Portfolio Info
</h2>

<input
name="portfolioTitle"
value={form.portfolioTitle}
onChange={handleChange}
placeholder="Portfolio Title"
className="input"
/>

<input
name="tagline"
value={form.tagline}
onChange={handleChange}
placeholder="Tagline"
className="input"
/>

<textarea
name="bio"
value={form.bio}
onChange={handleChange}
rows={4}
placeholder="Bio"
className="input"
/>

</div>


{/* SKILLS */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

<h2 className="text-lg font-semibold mb-4">
Skills
</h2>

<input
name="skills"
value={form.skills}
onChange={handleChange}
placeholder="React, Node, MongoDB, Tailwind"
className="input"
/>

</div>


{/* SOCIAL */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

<h2 className="text-lg font-semibold mb-4">
Social Links
</h2>

<input name="github" value={form.github} onChange={handleChange} placeholder="Github" className="input"/>

<input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn" className="input"/>

<input name="twitter" value={form.twitter} onChange={handleChange} placeholder="Twitter" className="input"/>

</div>


{/* SEO */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

<h2 className="text-lg font-semibold mb-4">
SEO Settings
</h2>

<input
name="metaTitle"
value={form.metaTitle}
onChange={handleChange}
placeholder="Meta Title"
className="input"
/>

<textarea
name="metaDescription"
value={form.metaDescription}
onChange={handleChange}
placeholder="Meta Description"
className="input"
/>

</div>


{/* THEME */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

<h2 className="text-lg font-semibold mb-4">
Theme
</h2>

<select
name="theme"
value={form.theme}
onChange={handleChange}
className="input"
>

<option value="dark">Dark</option>
<option value="light">Light</option>

</select>

</div>


{/* VISIBILITY */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

<h2 className="text-lg font-semibold mb-4">
Portfolio Visibility
</h2>

<select
name="visibility"
value={form.visibility}
onChange={handleChange}
className="input"
>

<option value="public">Public</option>
<option value="private">Private</option>

</select>

</div>


{/* RESUME */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

<h2 className="text-lg font-semibold mb-4">
Resume Upload
</h2>

<input
type="file"
accept=".pdf"
onChange={handleResume}
/>

<p className="text-indigo-400 text-sm mt-2">
{resumeName}
</p>

</div>


{/* PASSWORD */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

<h2 className="text-lg font-semibold mb-4">
Change Password
</h2>

<input
type="password"
name="password"
value={form.password}
onChange={handleChange}
placeholder="New Password"
className="input"
/>

</div>


{/* SAVE */}

<button
onClick={saveSettings}
disabled={loading}
className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-xl flex items-center gap-2"
>

<Save size={18}/>

{loading ? "Saving..." : "Save Settings"}

</button>


{/* DELETE */}

<button
onClick={deleteAccount}
className="bg-red-600 px-8 py-3 rounded-xl flex gap-2 items-center"
>

<Trash size={18}/>

Delete Portfolio

</button>

</div>

</div>

</div>

)

}