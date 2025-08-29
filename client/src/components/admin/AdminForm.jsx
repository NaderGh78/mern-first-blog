const AdminForm = ({ name, setName, email, setEmail, age, setAge, createUser }) => {
    return (
        <form className="mt-3" onSubmit={createUser}>

            <div className="form-group">
                <label htmlFor="newUser" className="text-dark">Name <span className="text-danger">*</span></label>
                <input
                    type="text"
                    className="form-control my-input"
                    id="newUser"
                    placeholder="Enter Username"
                    autoComplete="off"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
            </div>

            <div className="form-group">
                <label htmlFor="eamil" className="text-dark">Email <span className="text-danger">*</span></label>
                <input
                    type="eamil"
                    className="form-control my-input"
                    id="eamil"
                    placeholder="Enter User Email"
                    autoComplete="off"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="ageUser" className="text-dark">Age <span className="text-danger">*</span></label>
                <input
                    type="number"
                    className="form-control my-input"
                    id="ageUser"
                    placeholder="Enter User Age"
                    autoComplete="off"
                    onChange={e => setAge(e.target.value)}
                    value={age}
                />
            </div>

            <button
                type="submit"
                className="btn btn-dark rounded-0 w-100"
            >Create New User</button>

        </form>
    )
}

export default AdminForm;