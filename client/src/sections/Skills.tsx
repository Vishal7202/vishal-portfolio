import Container from "../components/Container"
import { Code, Database, Wrench, Cpu, Terminal } from "lucide-react"

export default function Skills() {

  const skillGroups = [

  {
    title: "Full Stack Development",
    icon: <Code size={22} />,
    items: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "JavaScript", level: 90 },
      { name: "React.js", level: 85 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "MongoDB", level: 80 },
    ],
  },

  {
    title: "Programming",
    icon: <Terminal size={22} />,
    items: [
      { name: "Java", level: 80 },
      { name: "Python", level: 75 },
      { name: "C", level: 70 },
      { name: "TypeScript", level: 75 },
    ],
  },

  {
    title: "Data Analysis",
    icon: <Database size={22} />,
    items: [
      { name: "Excel", level: 85 },
      { name: "SQL", level: 80 },
      { name: "Python (Data Analysis)", level: 75 },
      { name: "NumPy", level: 70 },
      { name: "Pandas", level: 75 },
      { name: "Matplotlib", level: 70 },
      { name: "Seaborn", level: 70 },
      { name: "Power BI", level: 80 },
    ],
  },

  {
    title: "Core Fundamentals",
    icon: <Cpu size={22} />,
    items: [
      { name: "Data Structures & Algorithms", level: 75 },
      { name: "Object Oriented Programming", level: 80 },
      { name: "DBMS", level: 75 },
      { name: "Operating System", level: 70 },
      { name: "Computer Networks", level: 70 },
    ],
  },

  {
    title: "Tools",
    icon: <Wrench size={22} />,
    items: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 90 },
      { name: "Postman", level: 80 },
      { name: "VS Code", level: 95 },
    ],
  },

]

  return (
    <section
      id="skills"
      className="relative py-28 md:py-36 overflow-hidden text-white"
    >

      <div className="absolute inset-0 bg-[#070916]" />

      <div className="absolute -left-40 top-20 w-[600px] h-[600px] bg-purple-700/20 blur-[160px] rounded-full" />

      <div className="absolute -right-40 bottom-20 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full" />

      <Container>

        <div className="relative z-10">

          <div className="text-center mb-24">

            <p className="text-sm uppercase tracking-[0.4em] text-indigo-400 mb-6">
              Expertise
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">
              Technical{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>

            <div className="w-28 h-[3px] mx-auto mt-8 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg shadow-purple-600/40" />

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {skillGroups.map((group, index) => (

              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 
                           p-8 rounded-2xl hover:scale-105 hover:border-indigo-500/40 
                           transition duration-300 shadow-lg shadow-black/30"
              >

                <div className="flex items-center gap-3 mb-8 text-indigo-300">

                  {group.icon}

                  <h3 className="text-lg font-semibold">
                    {group.title}
                  </h3>

                </div>


                <div className="space-y-6">

                  {group.items.map((skill, i) => (

                    <div key={i}>

                      <div className="flex justify-between text-sm mb-2 text-gray-300">

                        <span>{skill.name}</span>

                        <span>{skill.level}%</span>

                      </div>

                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-[1500ms]"
                          style={{ width: `${skill.level}%` }}
                        />

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

      </Container>

    </section>
  )
}