export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#070916]" />

      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-700/20 blur-[160px] rounded-full" />

      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.4em] text-indigo-400 mb-6">
            About Me
          </p>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Building Structured, Secure &
            <span className="block mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Scalable Web Applications
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-7 text-gray-300 leading-relaxed text-lg">

            <p>
              I am a final-year Computer Science Engineering student
              graduating in 2026. I specialize in full-stack web development
              using the MERN stack and enjoy building scalable
              and production-ready web applications.
            </p>

            <p>
              My core programming languages include
              <span className="text-indigo-300"> JavaScript, Java, Python and C</span>.
              I also have a strong understanding of
              <span className="text-indigo-300">
                {" "}Data Structures & Algorithms, Object-Oriented Programming,
                DBMS, Operating Systems and Computer Networks.
              </span>
            </p>

            <p>
              I have developed several full-stack applications featuring
              secure REST APIs, JWT authentication systems,
              responsive modern UI and modular backend architecture.
            </p>

            <p>
              I am currently looking for an entry-level Software Developer role
              where I can contribute to real-world production systems,
              collaborate with experienced engineers
              and continuously improve my backend and system design skills.
            </p>

          </div>

          {/* RIGHT STATS */}
          <div className="grid grid-cols-2 gap-6">

            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center hover:scale-105 transition duration-300">
              <h3 className="text-3xl font-bold text-pink-400">4+</h3>
              <p className="text-sm text-gray-400 mt-2">
                Full Stack Projects
              </p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center hover:scale-105 transition duration-300">
              <h3 className="text-3xl font-bold text-indigo-400">MERN</h3>
              <p className="text-sm text-gray-400 mt-2">
                Stack Expertise
              </p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center hover:scale-105 transition duration-300">
              <h3 className="text-3xl font-bold text-purple-400">REST</h3>
              <p className="text-sm text-gray-400 mt-2">
                API Development
              </p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center hover:scale-105 transition duration-300">
              <h3 className="text-3xl font-bold text-cyan-400">2026</h3>
              <p className="text-sm text-gray-400 mt-2">
                Graduation Year
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}