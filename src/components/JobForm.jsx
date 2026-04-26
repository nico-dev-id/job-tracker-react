import { useEffect, useState } from "react";

const JobForm = ({addJob, editId, jobs, closeModal }) => {

    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")
    const [status, setStatus] = useState("Applied")
    
    const [error, setError] = useState("")

    useEffect(() => {
        if (editId !== null) {
            const job = jobs.find((j) => j.id === editId)
            console.log("data ketemu:", job)
            if (job) {
                setCompany(job.company)
                setPosition(job.position)
                setStatus(job.status)
            } 
        } else {
                setCompany("")
                setPosition("")
                setStatus("Applied")

                //close modal setelah save
                if (closeModal) {
                    closeModal()
                }
            }
    }, [editId, jobs])

        //handle submit
        const handleSubmit = (e) => {
        e.preventDefault()

        if (!company || !position) {
            setError("Company and Position are required!")
            return
        }

        setError("")

        const newJob = {
            id: Date.now(), 
            company, 
            position, 
            status
        }

        addJob(newJob)
        
        setCompany("")
        setPosition("")
        setStatus("Applied")

        console.log(newJob)
    }

    return (
        <form 
         onSubmit={handleSubmit}
         className="bg-slate-800 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">Add Job</h2>
          
        {error && (<p className="text-red-400 mb-2">⚠️{error}</p>)}

        <input 
         type="text"
         placeholder="Company"
         value={company}
         onChange={(e) => setCompany(e.target.value)}
         className="w-full mb-3 p-2 rounded-lg bg-slate-700" />

        <input 
         type="text" 
         placeholder="Position"
         value={position}
         onChange={(e) => setPosition(e.target.value)}
         className="w-full mb-3 p-2 rounded-lg bg-slate-700"/>

         <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mb-3 p-2 rounded-lg bg-slate-700">
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
         </select>

         <button
          type="submit"
          className="bg-cyan-500 px-5 py-1.5 rounded-lg hover:bg-cyan-700">Save</button>

        </form>
    )
}

export default JobForm