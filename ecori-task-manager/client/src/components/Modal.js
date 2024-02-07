import { useState } from 'react'

const Modal = ( {mode, setShowModal, task }) => {
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : null,
    title: editMode ? task.title : null,
    description: editMode ? task.description : null,
    date: editMode ? "" : new Date()
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setData(data => ({
      ...data,
      [name] : value
    }))
  }
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
              
              <br/>
            <input className={ mode }type="submit"/>
          </form>
        </div>
      </div>
    )
  }
  
  export default Modal
  