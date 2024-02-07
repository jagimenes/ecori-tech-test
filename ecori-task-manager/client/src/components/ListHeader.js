import Modal from "./Modal"

const ListHeader = ({ listName }) => {

  const signOut = () => {
    console.log('signout')
  }

    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
            <button className="create-task-button">Create Task</button>
            <button className="sign-out-button" onClick={signOut}>Sign Out</button>
        </div>
        <Modal/>
      </div>
    )
  }
  
  export default ListHeader
  