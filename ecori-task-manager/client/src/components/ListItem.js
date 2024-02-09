// Import modules and hooks
import { useState } from "react"
import Modal from "./Modal"

// Define the ListItem component
const ListItem = ({ task, getData }) => {
  // Use state hook to manage component state
  const [showModal, setShowModal] = useState(false)
  
  // Function to delete the current item
  const deleteItem = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${ task.id }`,{
        method:'DELETE'
      })
      if (response.status === 200){
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Function to format a date string
  const formatDate = (dateString) => {
    const options = {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

    // Render the ListItem component
    return (
      <li className="list-item">
        <div className="info-container">
          <p className={`${task.completed_at && "completed"} task-title`}>{task.title}</p>
        </div>
        <div className="date-info">
        <p className="creation-date">Created on: {formatDate(task.created_at)}</p>
        </div>
        <div className="button-container">
          <button className="edit" onClick={ () => setShowModal(true) }>Edit</button>
          <button className="delete" onClick={deleteItem}>Delete</button>
        </div>
        { showModal && <Modal mode={ 'edit' } setShowModal={ setShowModal } getData={ getData } task={ task }/> }
      </li>
    )
  }
  
  // Export the ListItem component
  export default ListItem
  