import { useState } from 'react'
import { useCookies } from 'react-cookie'

const Modal = ( {mode, setShowModal, getData, task }) => {

  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    description: editMode ? task.description : "",
    created_at: editMode ? "" : new Date(),
    updated_at: editMode ? new Date() : ""
  })

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks`, {
        method: "POST",
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const editData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${ task.id }`,{
        method:"PUT",
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setData(data => ({
      ...data,
      [name] : value
    }))
  }

  const formatDate = (dateString) => {
    const options = {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
  
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} a task</h3>
            <button onClick={ () => setShowModal(false) }>X</button>
          </div>
          <form>
            <input
              required
              maxLength={255}
              placeholder=" Name a new task"
              name="title"
              value={ data.title }
              onChange={handleChange}
            />
            <br/>
            <input
              required
              maxLength={2550}
              placeholder=" Write the task description"
              name="description"
              value={ data.description }
              onChange={handleChange}/>
              <div>
              {task && task.updated_at && (<p className="update-date">Updated on: {formatDate(task.updated_at)}</p>)}
              </div>
              <br/>
            <input className={ mode }type="submit" onClick={ editMode ? editData : postData }/>
          </form>
        </div>
      </div>
    )
  }
  
  export default Modal
  