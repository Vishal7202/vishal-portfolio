import { Mail, Trash2, Eye } from "lucide-react"
import { useEffect, useState } from "react"

export default function Messages() {

  const [messages, setMessages] = useState<any[]>([])
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  // FETCH MESSAGES

  const fetchMessages = async () => {

    try {

      const res = await fetch("https://vishal-portfolio-xud3.onrender.com/api/contact")

      const data = await res.json()

      setMessages(data)

    } catch (error) {

      console.log("Error fetching messages", error)

    }

  }

  useEffect(() => {

    fetchMessages()

  }, [])


  // DELETE MESSAGE

  const deleteMessage = async (id:any) => {

    const confirmDelete = confirm("Delete this message?")

    if(!confirmDelete) return

    try{

      await fetch(`https://vishal-portfolio-xud3.onrender.com/api/contact/${id}`,{
        method:"DELETE"
      })

      setMessages(prev => prev.filter(msg => msg._id !== id))

    }catch(err){

      console.log("Delete failed",err)

    }

  }


  // MARK AS READ

  const markAsRead = async (id:any) => {

    try{

      await fetch(`https://vishal-portfolio-xud3.onrender.com/api/contact/read/${id}`,{
        method:"PUT"
      })

      fetchMessages()

    }catch(err){

      console.log(err)

    }

  }


  return (

    <div className="w-full">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Messages
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Messages received from your portfolio contact form
        </p>

      </div>


      <div className="bg-[#0d1117] border border-gray-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#161b22] text-gray-400 text-sm">

            <tr>

              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Subject</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-right px-6 py-4">Actions</th>

            </tr>

          </thead>


          <tbody>

            {messages.map((msg) => (

              <tr
                key={msg._id}
                className="border-t border-gray-800 hover:bg-[#161b22]/60 transition"
              >

                <td className="px-6 py-4 text-white font-medium flex items-center gap-2">

                  <Mail size={16} className="text-indigo-400"/>

                  {msg.name}

                </td>


                <td className="px-6 py-4 text-gray-400">
                  {msg.email}
                </td>


                <td className="px-6 py-4 text-gray-300">
                  {msg.subject}
                </td>


                <td className="px-6 py-4 text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>


                <td className="px-6 py-4">

                  <span className={`px-3 py-1 text-xs rounded-full font-medium
                  ${
                    msg.status === "new"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}>

                    {msg.status}

                  </span>

                </td>


                <td className="px-6 py-4">

                  <div className="flex justify-end gap-3">

                    {/* VIEW MESSAGE */}

                    <button
                      onClick={()=>{
                        setSelectedMessage(msg)
                        markAsRead(msg._id)
                      }}
                      className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition"
                    >
                      <Eye size={16}/>
                    </button>


                    {/* DELETE MESSAGE */}

                    <button
                      onClick={()=>deleteMessage(msg._id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    >
                      <Trash2 size={16}/>
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* MESSAGE MODAL */}

      {selectedMessage && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#020617] border border-gray-800 rounded-xl p-6 w-[500px]">

            <h2 className="text-xl font-semibold mb-4">
              Message
            </h2>

            <p className="text-gray-400 mb-2">
              <b>Name:</b> {selectedMessage.name}
            </p>

            <p className="text-gray-400 mb-2">
              <b>Email:</b> {selectedMessage.email}
            </p>

            <p className="text-gray-400 mb-4">
              <b>Subject:</b> {selectedMessage.subject}
            </p>

            <p className="text-gray-300">
              {selectedMessage.message}
            </p>

            <button
              onClick={()=>setSelectedMessage(null)}
              className="mt-6 px-4 py-2 bg-indigo-600 rounded-lg"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  )

}