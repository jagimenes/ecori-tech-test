// Import modules and hooks
import Modal from "./Modal"
import { useState } from "react"
import { useCookies } from "react-cookie"

// Define the ListHeader component
const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [showModal, setShowModal] = useState(false)

  // Initialize state for form data
  const [data, setData] = useState({
    title: '',
    description: '',
  })

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    const newData = {
      ...data,
      [name]: value,
    }

    setData(newData)

    // Fetch data based on the updated form data
    getData(newData.title, newData.description)
  }

  // Function to sign out the user
  const signOut = () => {
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }

  // Render the ListHeader component
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="right-container">
        <div className="button-container">
          <button className="create-task-button" onClick={() => setShowModal(true)}>Create Task</button>
          <button className="sign-out-button" onClick={signOut}>Sign Out</button>
        </div>
        <div className="search-container">
          <input
            required
            maxLength={255}
            placeholder="Name task"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <input
            style={{ marginLeft: '5px' }}
            required
            maxLength={255}
            placeholder="Name description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </div>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData(data.title, data.description)} />}
    </div>
  )
}

// Export the ListHeader component
export default ListHeader