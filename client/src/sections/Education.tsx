import Container from "../components/Container"

export default function Education() {

  return (

    <section
      id="education"
      className="relative py-28 md:py-36 overflow-hidden text-white"
    >

      {/* Background */}

      <div className="absolute inset-0 bg-[#070916]" />

      <div className="absolute -left-40 top-20 w-[600px] h-[600px] bg-purple-700/20 blur-[160px] rounded-full" />

      <div className="absolute -right-40 bottom-20 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full" />

      <Container>

        <div className="relative z-10">

          {/* Header */}

          <div className="text-center mb-24">

            <p className="text-sm uppercase tracking-[0.4em] text-indigo-400 mb-6">
              Education
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">

              Academic{" "}

              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Background
              </span>

            </h2>

            <div className="w-28 h-[3px] mx-auto mt-8 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg shadow-purple-600/40" />

          </div>


          {/* Card */}

          <div className="max-w-3xl mx-auto">

            <div className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center hover:scale-105 transition duration-300">

              <h3 className="text-2xl font-semibold text-indigo-300">
                B.Tech – Computer Science Engineering
              </h3>

              <p className="mt-4 text-gray-400">
                IES College Of Technology, Bhopal
              </p>

              <p className="mt-2 text-gray-400">
                Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)
              </p>

              <p className="mt-2 text-gray-400">
                2022 – 2026
              </p>

              <p className="mt-4 text-pink-400 font-semibold">
                Current CGPA: 7.73
              </p>

            </div>

          </div>

        </div>

      </Container>

    </section>

  )

}