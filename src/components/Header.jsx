const Header = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Job Tracker</h1>

            <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 
            rounded-lg">+ Add Job</button>
        </div>
    )
}

export default Header