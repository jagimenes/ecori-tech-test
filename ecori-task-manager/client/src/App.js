import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import { useEffect, useState } from 'react'

const App = () => {
  const userEmail = 'claud@test.com'
  const [ tasks, setTasks ] = useState(null) 
  const getData = async () => {
    try{
      const response = await fetch(`http://localhost:8000/tasks/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    }catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getData, [])
  console.log(tasks)

  const sortedTasks = tasks?.sort((a,b) => new Date(a.created_at) - new Date(a.created_at))

  return (
    <div className="app">
      <ListHeader listName={'Ecori Task Manager'} getData={ getData }/>
      {sortedTasks?.map((task) => <ListItem key={ task.id } task={ task } getData={ getData }/>)}
    </div>
  )
}

export default App
