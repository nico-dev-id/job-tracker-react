import { useEffect, useState } from "react"
import Header from "./components/Header"
import JobForm from "./components/JobForm"


const App = () => {

  const [editId, setEditId] = useState(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs")
    const parsed = saved ? JSON.parse(saved): []
    return parsed.map((job) => ({
      ...job,
      id:job.id || Date.now() + Math.random(),
    }))
  })
  
  const addJob = (job) => {
    if (editId !== null) {
      const update = jobs.map((j) => j.id === editId ? {...job, id: editId} : j )
      setJobs(update)
      setEditId(null)
    } else {
      setJobs([...jobs, job])
    }
  }

  const deleteJob = (id) => {
    const filtered = jobs.filter((job) => job.id !== id)
    setJobs(filtered)
  }

//edit
  const handleEdit = (job) => {
    //console.log("Edit diklik", job)
    setEditId(job.id)
    setIsModalOpen(true)
  }

    useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs))
  }, [jobs])

  //filter
  const filteredJobs = jobs.filter((job) => {
    const matchStatus = statusFilter === "all" || job.status === statusFilter
    const matchSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase())
    return matchStatus && matchSearch
  })

  //warna filter
  const getStatusColor = (status) => {
    if (status === "Applied") return "bg-blue-500"
    if (status === "Interview") return "bg-yellow-500"
    if (status === "Rejected") return "bg-red-500"
  }

  return (
    <>
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <Header />
        <JobForm 
         addJob={addJob} 
         editId={editId}
         jobs={jobs}
         closeModal={() => setIsModalOpen(false)} //close modal setelah save
         />

         <div className="flex gap-2 my-4">
          <input 
            type="text"
            placeholder="Search by Company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-1 rounded text-black" />

            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-1 rounded text-black">
              <option value="all">All</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>

            </select>
         </div>

        <div className="space-y-3">

          {filteredJobs.map((job) => (
            <div key={job.id} 
                 className="bg-slate-800 p-4 rounded-lg flex justify-between items-center hover:bg-slate-700 transition">
              
              <div>
                <h3 className="font-bold">{job.company}</h3>
                <p>{job.position}</p>

                <div className="mt-2">
                  <span 
                    className={`${getStatusColor(job.status)}
                    text-white px-2 py-1 rounded text-sm`}>{job.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                 onClick={() => deleteJob(job.id)}
                 className="bg-red-500 px-3 py-1 rounded-lg mt-2 hover:bg-red-700">Delete</button>
              
                <button
                 onClick={() => handleEdit(job)}
                 className="bg-yellow-500 px-3 py-1 rounded-lg mr-2 mt-2 hover:bg-yellow-600">Edit</button>
              </div>

            </div>
          ))}
        </div>

        {/* EDIT MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-slate-900 text-white p-6 rounded-lg w-96
                            transform transition-all duration-300 scale-95 opacity-0 animate-modal">
              <h2 className="text-lg font-bold mb-4">Edit Job</h2>

              <JobForm
                addJob={addJob}
                editId={editId} 
                jobs={jobs}
                closeModal={() => setIsModalOpen(false)}
              />

              <button 
                onClick={() => {
                  setIsModalOpen(false)
                  setEditId(null)
                }}
                className="mt-4 bg-gray-500 px-3 py-1 rounded">Close</button>

            </div>
          </div>
        )}

        {jobs.length === 0 && (
          <p className="text-center text-slate-400 mt-4">No jobs yet. Start adding one🚀</p>
        )}

      </div>
    </div>
    
    </>
  )
}

export default App