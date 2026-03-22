import Container from "../components/Container"

export default function Certificates() {

const certificates = [
{
title: "Java Programming",
issuer: "Online Learning",
year: "2024"
},
{
title: "Python Programming",
issuer: "Online Learning",
year: "2024"
},
{
title: "MERN Stack Development",
issuer: "Self Learning",
year: "2024"
},
{
title: "Data Structures & Algorithms",
issuer: "Self Study",
year: "2023"
}
]

return (


<section id="certificates" className="relative py-28 md:py-32 text-white">

  <Container>

    {/* HEADER */}

    <div className="text-center mb-20">

      <p className="text-sm uppercase tracking-[0.4em] text-indigo-400 mb-6">
        Certifications
      </p>

      <h2 className="text-3xl md:text-5xl font-bold">
        My{" "}
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Certificates
        </span>
      </h2>

      <div className="w-28 h-[3px] mx-auto mt-8 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg shadow-purple-600/40" />

    </div>

    {/* GRID */}

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {certificates.map((cert, index) => (

        <div
          key={index}
          className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl
          hover:scale-105 transition duration-300 text-center"
        >

          <h3 className="text-lg font-semibold text-white">
            {cert.title}
          </h3>

          <p className="text-sm text-indigo-300 mt-2">
            {cert.issuer}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {cert.year}
          </p>

        </div>

      ))}

    </div>

  </Container>

</section>


)

}
