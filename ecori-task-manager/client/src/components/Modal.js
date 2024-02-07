const Modal = () => {
  const mode = "edit"
  const handleChange = () => {
    console.log("change")
  }
    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} a task</h3>
            <button>X</button>
          </div>

          <form>
            <input
              required
              maxLength={255}
              placeholder=" Name a new task"
              name="task-title"
              value={""}
              onChange={handleChange}
            />
            <br/>
            <input
              required
              maxLength={2550}
              placeholder=" Write the task description"
              name="task-description"
              value={""}
              onChange={handleChange}/>
              
              <br/>
            <input className={ mode }type="submit"/>
          </form>
        </div>
      </div>
    )
  }
  
  export default Modal
  