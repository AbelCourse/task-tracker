import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";

import {useState , useEffect} from 'react'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    const getTask = async () => {
      const taskFromServ = await fetchTask()
      setTasks(taskFromServ)
    }
    getTask()
  },[])

  const fetchTask = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTasks = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async (task) => {
    // const id = Math.floor(Math.random()*10000) + 1
    // const newTask = {id , ...task}
    

    const res = await fetch('http://localhost:5000/tasks',{
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks,data])
  }


  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE',
    })


    setTasks(tasks.filter((task) => task.id !== id))
  }

  const reminder = async (id) => {

    const taskToggle = await fetchTasks(id)
    const updTask = { ...taskToggle, reminder: !taskToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method : 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    console.log(data)

    setTasks(
      tasks.map((task) => 
        task.id === id ? 
        {...task, reminder: data.reminder} : task))
  }
    return (
      <div className="App">
        <div className='container'>
        <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <h3> - Double click to set priority</h3>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} reminder={reminder}/> : 'No Tasks to show'}
        </div>
      </div>
    );
  }

export default App;
