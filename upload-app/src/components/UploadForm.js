import { useState, useEffect } from 'react'

const UploadForm = () => {
  const [file, setFile] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }, [])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append("photo", file, file.name)

    fetch('http://localhost:5000/files', {
      method: "post",
      body: formdata
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }

  console.log(file)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {users.map(user => (
        <>
          <p>{user.name}</p>
          <img src={user.profile_picture} alt={user.name} />
        </>
      ))}
    </>
  )
}

export default UploadForm