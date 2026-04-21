import { useEffect, useState } from "react"
import Header from "./components/Header"
import JobForm from "./components/JobForm"


const App = () => {

  const [editId, setEditId] = useState(null)
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
    console.log("Edit diklik", job)
    setEditId(job.id)
  }

    useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs))
  }, [jobs])

  return (
    <>
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <Header />
        <JobForm 
         addJob={addJob} 
         editId={editId}
         jobs={jobs}
         />

        <div className="space-y-3">

          {jobs.map((job) => (
            <div key={job.id} className="bg-slate-800 p-4 rounded-lg">
              <h3 className="font-bold">{job.company}</h3>
              <p>{job.position}</p>
              <p className="text-sm text-slate-400">{job.status}</p>

              <button
               onClick={() => deleteJob(job.id)}
               className="bg-red-500 px-3 py-1 rounded-lg mt-2">Delete</button>
            
              <button
               onClick={() => handleEdit(job)}
               className="bg-yellow-500 px-3 py-1 rounded-lg mr-2 mt-2">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    </>
  )
}

export default App