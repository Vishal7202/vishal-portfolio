import { useState } from "react"
import { Plus, Pencil, Trash2, Eye, X } from "lucide-react"

interface Blog {
  id: number
  title: string
  category: string
  status: "Published" | "Draft"
  date: string
}

export default function Blogs() {

  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: "How I Built My MERN Portfolio",
      category: "Development",
      status: "Published",
      date: "2 Mar 2026"
    },
    {
      id: 2,
      title: "React vs Vue for Beginners",
      category: "Tech",
      status: "Draft",
      date: "28 Feb 2026"
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "Draft" as "Published" | "Draft"
  })


  // OPEN ADD MODAL
  const openAddModal = () => {

    setEditingBlog(null)

    setFormData({
      title: "",
      category: "",
      status: "Draft"
    })

    setShowModal(true)

  }


  // OPEN EDIT MODAL
  const handleEdit = (blog: Blog) => {

    setEditingBlog(blog)

    setFormData({
      title: blog.title,
      category: blog.category,
      status: blog.status
    })

    setShowModal(true)

  }


  // VIEW BLOG
  const handleView = (blog: Blog) => {
    alert(`Viewing Blog: ${blog.title}`)
  }


  // DELETE BLOG
  const handleDelete = (id: number) => {

    if (confirm("Delete this blog?")) {

      setBlogs(blogs.filter((blog) => blog.id !== id))

    }

  }


  // HANDLE INPUT
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }


  // SUBMIT BLOG
  const handleSubmit = () => {

    if (!formData.title || !formData.category) {
      alert("Fill all fields")
      return
    }

    if (editingBlog) {

      setBlogs(
        blogs.map((blog) =>
          blog.id === editingBlog.id
            ? { ...blog, ...formData }
            : blog
        )
      )

    } else {

      const newBlog: Blog = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString()
      }

      setBlogs([...blogs, newBlog])

    }

    setShowModal(false)

  }



  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Manage Blogs
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Create and manage your blog posts
          </p>

        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 rounded-xl font-medium hover:scale-105 transition"
        >

          <Plus size={18}/>
          Add Blog

        </button>

      </div>



      {/* BLOG TABLE */}
      <div className="bg-[#0d1117] border border-gray-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#161b22] text-gray-400 text-sm">

            <tr>

              <th className="text-left px-6 py-4">Title</th>

              <th className="text-left px-6 py-4">Category</th>

              <th className="text-left px-6 py-4">Status</th>

              <th className="text-left px-6 py-4">Date</th>

              <th className="text-right px-6 py-4">Actions</th>

            </tr>

          </thead>


          <tbody>

            {blogs.map((blog) => (

              <tr
                key={blog.id}
                className="border-t border-gray-800 hover:bg-[#161b22]/60 transition"
              >

                <td className="px-6 py-4 text-white font-medium">
                  {blog.title}
                </td>

                <td className="px-6 py-4 text-gray-400">
                  {blog.category}
                </td>

                <td className="px-6 py-4">

                  <span className={`px-3 py-1 text-xs rounded-full
                  ${blog.status === "Published"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                    }`}>

                    {blog.status}

                  </span>

                </td>

                <td className="px-6 py-4 text-gray-400">
                  {blog.date}
                </td>


                {/* ACTION BUTTONS */}
                <td className="px-6 py-4">

                  <div className="flex justify-end gap-3">

                    <button
                      onClick={() => handleView(blog)}
                      className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition"
                    >
                      <Eye size={16}/>
                    </button>

                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition"
                    >
                      <Pencil size={16}/>
                    </button>

                    <button
                      onClick={() => handleDelete(blog.id)}
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



      {/* MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-[#0d1117] p-8 rounded-2xl w-[400px] border border-gray-800">

            <div className="flex justify-between mb-6">

              <h2 className="text-xl font-bold text-white">

                {editingBlog ? "Edit Blog" : "Add Blog"}

              </h2>

              <button onClick={() => setShowModal(false)}>

                <X/>

              </button>

            </div>


            {/* INPUTS */}

            <input
              name="title"
              placeholder="Blog Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mb-4 p-3 rounded-lg bg-[#161b22] text-white"
            />

            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mb-4 p-3 rounded-lg bg-[#161b22] text-white"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mb-6 p-3 rounded-lg bg-[#161b22] text-white"
            >

              <option value="Draft">Draft</option>
              <option value="Published">Published</option>

            </select>


            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-500"
            >

              {editingBlog ? "Update Blog" : "Add Blog"}

            </button>

          </div>

        </div>

      )}

    </div>
  )
}