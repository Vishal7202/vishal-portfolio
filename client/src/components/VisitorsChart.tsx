import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"
import { useEffect, useState } from "react"

export default function VisitorsChart() {

  const [data,setData] = useState<any[]>([])

  useEffect(()=>{

    const fetchVisitors = async()=>{

      try{

        const res = await fetch("http://localhost:5000/api/analytics/visitors")

        const result = await res.json()

        setData(result)

      }catch(err){

        console.log(err)

      }

    }

    fetchVisitors()

  },[])

  return (

    <div className="bg-[#0f172a] backdrop-blur-xl p-6 rounded-xl border border-white/10">

      <h2 className="text-lg font-semibold mb-4">
        Visitor Analytics
      </h2>

      <ResponsiveContainer width="100%" height={260}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937"/>

          <XAxis
            dataKey="month"
            stroke="#9ca3af"
          />

          <YAxis
            stroke="#9ca3af"
          />

          <Tooltip
            contentStyle={{
              background:"#020617",
              border:"1px solid #1f2937",
              borderRadius:"8px"
            }}
          />

          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r:4 }}
            activeDot={{ r:6 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )

}