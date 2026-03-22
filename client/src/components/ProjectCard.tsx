import Tilt from "react-parallax-tilt"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

interface ProjectCardProps {
title: string
description?: string
image?: string
tech?: string[]
liveLink?: string
githubLink?: string
featured?: boolean
}

export default function ProjectCard({
title,
description,
image,
tech = [],
liveLink,
githubLink,
featured = false,
}: ProjectCardProps) {

const fallbackImage = "/project1.jpg"

return (


<Tilt
  glareEnable
  glareMaxOpacity={0.15}
  glareColor="#ffffff"
  glarePosition="all"
  scale={1.04}
  transitionSpeed={1200}
  tiltMaxAngleX={8}
  tiltMaxAngleY={8}
  className="rounded-2xl"
>

  <div
    className="group relative bg-white/5 backdrop-blur-xl
    border border-white/10 rounded-2xl overflow-hidden
    transition duration-500 hover:border-purple-500/40
    hover:-translate-y-3 shadow-lg hover:shadow-purple-500/30
    flex flex-col h-[480px]"
  >

    {/* FEATURED BADGE */}

    {featured && (
      <div className="absolute top-4 left-4 z-20 text-xs font-semibold
      px-3 py-1 rounded-full
      bg-gradient-to-r from-pink-500 to-indigo-500
      text-white shadow-lg">
        Featured
      </div>
    )}


    {/* IMAGE SECTION */}

    <div className="relative overflow-hidden h-56">

      {image ? (

        <img
          src={image}
          alt={title}
          onError={(e) => (e.currentTarget.src = fallbackImage)}
          className="w-full h-full object-cover
          transition duration-700 group-hover:scale-110"
        />

      ) : (

        <div className="w-full h-full flex items-center justify-center
        bg-gradient-to-br from-indigo-500/20 to-purple-500/20">

          <span className="text-gray-400 text-sm">
            Project Preview
          </span>

        </div>

      )}

      <div className="absolute inset-0 bg-gradient-to-t
      from-[#070916] via-transparent to-transparent opacity-90" />

    </div>


    {/* CONTENT */}

    <div className="p-6 flex flex-col flex-grow space-y-4">

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      {description && (
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      )}


      {/* TECH STACK */}

      <div className="flex flex-wrap gap-2 pt-1">

        {tech.map((item, index) => (

          <span
            key={index}
            className="text-xs font-medium px-3 py-1
            bg-white/10 text-gray-300
            rounded-full border border-white/10
            hover:bg-purple-500/20 transition"
          >

            {item}

          </span>

        ))}

      </div>


      {/* BUTTONS */}

      <div className="flex gap-4 pt-4 mt-auto">

        {liveLink && (

          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white
            bg-gradient-to-r from-indigo-600 to-purple-600
            px-4 py-2 rounded-lg
            shadow-lg shadow-purple-600/30
            hover:scale-105 active:scale-95
            transition"
          >

            <FaExternalLinkAlt size={14} />
            Live Demo

          </a>

        )}

        {githubLink && (

          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-300
            border border-white/20
            px-4 py-2 rounded-lg
            backdrop-blur-md
            hover:bg-white/10
            hover:border-purple-500/40
            transition"
          >

            <FaGithub size={16} />
            GitHub

          </a>

        )}

      </div>

    </div>

  </div>

</Tilt>


)

}
