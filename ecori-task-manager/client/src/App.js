import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken
  const [ tasks, setTasks ] = useState(null) 

  const getData = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks?userEmail=${userEmail}&title=5`)
      const json = await response.json()
      setTasks(json)
    }catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if(authToken){ 
      getData()
    }}, [])

  const sortedTasks = tasks?.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
      <> <p className="user-email">Welcome, { userEmail }</p> 
      <ListHeader listName={'Ecori Task Manager'} getData={ getData } />
      {sortedTasks?.map((task) => <ListItem key={ task.id } task={ task } getData={ getData }/>)}
      </>}
    </div>
  )
}

export default App
