import {
  Users,
  Eye,
  MessageCircle,
  FileText
} from "lucide-react"

import { useEffect, useState } from "react"
import axios from "axios"

type StatsType = {
  visitors:number
  messages:number
  projects:number
  users:number
}

export default function Analytics(){

const [stats,setStats] = useState<StatsType>({
visitors:0,
messages:0,
projects:0,
users:0
})

const [loading,setLoading] = useState(true)

useEffect(()=>{

fetchStats()

},[])


const fetchStats = async()=>{

try{

const res = await axios.get(
"https://vishal-portfolio-xud3.onrender.com/api/dashboard"
)
setStats({
visitors:res.data.visitors || 0,
messages:res.data.messages || 0,
projects:res.data.projects || 0,
users:res.data.users || 0
})

}catch(err){

console.log(err)

}finally{

setLoading(false)

}

}


const statsCards = [
{
title:"Total Visitors",
value:stats.visitors,
icon:Eye
},
{
title:"Messages",
value:stats.messages,
icon:MessageCircle
},
{
title:"Projects",
value:stats.projects,
icon:FileText
},
{
title:"Users",
value:stats.users,
icon:Users
}
]


return(

<div className="w-full">

{/* HEADER */}

<div className="mb-8">

<h1 className="text-3xl font-bold text-white">
Analytics Dashboard
</h1>

<p className="text-gray-400 text-sm mt-1">
Monitor portfolio performance and engagement
</p>

</div>



{/* STATS CARDS */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

{statsCards.map((stat,index)=>{

const Icon = stat.icon

return(

<div
key={index}
className="bg-[#0d1117] border border-gray-800 rounded-2xl p-6 hover:bg-[#161b22] transition"
>

<div className="flex items-center justify-between mb-4">

<div className="text-gray-400 text-sm">
{stat.title}
</div>

<div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
<Icon size={18}/>
</div>

</div>

<h2 className="text-3xl font-bold text-white">

{loading ? "..." : stat.value}

</h2>

</div>

)

})}

</div>



{/* CHART AREA */}

<div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-8">

<h2 className="text-lg font-semibold text-white mb-6">
Visitor Activity
</h2>

<div className="h-64 flex items-center justify-center text-gray-500 border border-dashed border-gray-700 rounded-xl">

Visitor chart coming soon

</div>

</div>

</div>

)

}