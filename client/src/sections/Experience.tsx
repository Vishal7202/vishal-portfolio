import Container from "../components/Container"

export default function Experience() {
return ( <section id="experience" className="relative py-28 md:py-32 text-white"> <Container>


    {/* HEADER */}
    <div className="text-center mb-20">
      <p className="text-sm uppercase tracking-[0.4em] text-indigo-400 mb-6">
        Development Journey
      </p>

      <h2 className="text-3xl md:text-5xl font-bold">
        My Learning{" "}
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Journey
        </span>
      </h2>

      <div className="w-28 h-[3px] mx-auto mt-8 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg shadow-purple-600/40" />
    </div>

    {/* TIMELINE */}
    <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-16">

      <TimelineItem
        title="Full Stack MERN Projects"
        company="Personal Development"
        year="2024 - Present"
        description="Built multiple full-stack web applications using React, Node.js, Express and MongoDB. Implemented REST APIs, authentication systems and responsive UI."
      />

      <TimelineItem
        title="Backend & API Development"
        company="Self Learning"
        year="2023 - 2024"
        description="Focused on backend architecture, REST API development, database modeling and authentication using Node.js, Express and MongoDB."
      />

      <TimelineItem
        title="Computer Science Fundamentals"
        company="B.Tech Computer Science Engineering"
        year="2022 - Present"
        description="Studying Data Structures & Algorithms, Object Oriented Programming, DBMS, Operating Systems and Computer Networks."
      />

    </div>

  </Container>
</section>


)
}

/* ================= Timeline Item Component ================= */

function TimelineItem({
title,
company,
year,
description,
}: {
title: string
company: string
year: string
description: string
}) {
return ( <div className="relative pl-8 md:pl-12 group">


  {/* DOT */}
  <div className="absolute -left-[9px] top-2 w-4 h-4 
                  bg-gradient-to-r from-pink-500 to-indigo-500 
                  rounded-full shadow-lg shadow-purple-600/40" />

  <div className="glass p-6 rounded-xl border border-white/10
                  hover:scale-[1.02] transition duration-300">

    <h3 className="text-xl font-semibold text-white">
      {title}
    </h3>

    <p className="text-sm text-indigo-300 mt-1">
      {company} • {year}
    </p>

    <p className="text-gray-400 leading-relaxed mt-3 text-sm">
      {description}
    </p>

  </div>
</div>


)
}
