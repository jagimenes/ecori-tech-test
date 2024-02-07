const ListItem = ({task}) => {
    return (
      <li className="list-item">
        <div className="info-container">
          <p className="task-title">{task.title}</p>
        </div>
        <div className="button-container">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </div>
      </li>
    )
  }
  
  export default ListItem
  