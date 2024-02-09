// Import modules and hooks
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

// Define the Modal component
const Modal = ({ mode, setShowModal, getData, task }) => {

  // Use cookies hook to access cookies
  const [cookies] = useCookies(null)

  // Determine if the mode is 'edit'
  const editMode = mode === 'edit' ? true : false

  // Initialize state for form data
  const [isChecked, setIsChecked] = useState(editMode && task && task.completed_at)
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? (task.title || '') : '',
    description: editMode ? (task.description || '') : '',
    created_at: editMode ? '' : new Date(),
    updated_at: editMode ? new Date() : '',
    completed_at: isChecked ? new Date() : '',
  })

  // Effect hook to update the 'completed_at' field in the form data when checkbox changes
  useEffect(() => {
    if (isChecked) {
      setData((prevData) => ({
        ...prevData,
        completed_at: new Date(),
      }));
    }else {
      setData((prevData) => ({
        ...prevData,
        completed_at: '',
      }));
    }
  }, [isChecked])

  // Function to handle checkbox changes in the form
  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked)
  }

  // Function to handle form submission for creating a new task
  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false)
        getData();
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Function to handle form submission for editing an existing task
  const editData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Function to handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Function to format date
  const formatDate = (dateString) => {
    const options = {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    const date = new Date(dateString)
    return date.toLocaleString('en-US', options)
  }

  // Render the Modal component
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} a task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={255}
            placeholder=" Name a new task"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <input
            required
            maxLength={2550}
            placeholder=" Write the task description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
          <div className="update-box">
            {editMode && (
              <>
                <label className="switch">
                <p className="completed-text">Completed</p>
                  <input
                    type="checkbox"
                    id="slider"
                    className="slider"
                    value="yes"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="slider round"></span>
                </label>
                {isChecked && task && task.completed_at && (
                  <p className="completed-date">Completed on: {formatDate(task.completed_at)}</p>
                )}
                {!isChecked && task && task.updated_at && (
                  <p className="update-date">Updated on: {formatDate(task.updated_at)}</p>
                )}
              </>
            )}
          </div>
          <br />
          <input className={mode} type="submit" onClick={editMode ? editData : postData} />
        </form>
      </div>
    </div>
  );
};

// Export the Modal component
export default Modal;
