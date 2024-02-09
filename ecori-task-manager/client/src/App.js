// Import modules and components
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import Pagination from './components/Pagination'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

// Define the main App component
const App = () => {
  // Initialize state variables using hooks
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken
  const [tasks, setTasks] = useState(null)
  const [pageSizeState, setPageSize] = useState(5)
  const [pageState, setPage] = useState(1)

  // Function to fetch tasks data from the server
  const getData = async (title = '', description = '', pageSize = null, page = null) => {
    let request = `${process.env.REACT_APP_SERVERURL}/tasks?userEmail=${userEmail}`

    if(title) {
      request += `&title=${title}`
    }
    if(description) {
      request += `&description=${description}`
    }
    if(pageSize) {
      request += `&pageSize=${pageSize}`
    }
    if(page) {
      request += `&page=${page}`
    }
    try {
      const response = await fetch(request)
      const json = await response.json()
      setPage(1)
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])

  // Sort and paginate tasks based on page size and page number
  let sortedTasks = tasks?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  sortedTasks = sortedTasks?.filter((task, index) => (((index + 1) > pageSizeState * (pageState - 1)) && ((index + 1) <= pageSizeState * pageState)))

  // Render the component
  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken &&
        <> <p className="user-email">Welcome, {userEmail}</p>
          <ListHeader listName={'Ecori Task Manager'} getData={getData} />
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
          <Pagination pageSize={pageSizeState} quantity={tasks?.length} page={pageState} setPage={(page) => setPage(page)} />
        </>
      }
    </div>
  )
}

// Export the App component
export default App
