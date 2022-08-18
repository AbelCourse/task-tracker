import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";

import {useState} from 'react'
function App() {
  const [tasks, setTasks] = useState([
    {
        id:1,
        text: 'Buy Car',
        day: 'Feb 4th',
        reminder: false,
    },
    {
        id:2,
        text: 'Phone',
        day: 'Aug 4th',
        reminder: true,
    },
    {
        id:3,
        text: 'Earphone',
        day: 'Apr 4th',
        reminder: false,
    },
    {
        id:4,
        text: 'Water',
        day: 'Sept 4th',
        reminder: true,
    },
])

const addTask = (task) =>{
  const id = Math.floor(Math.random()*10000) + 1
  const newTask = {id , ...task}
  setTasks([...tasks,newTask])
}


const deleteTask = (id) =>{
  setTasks(tasks.filter((task) => task.id !== id))
}

const reminder = (id) => {
  setTasks(tasks.map((task) => task.id === id ? {...task,reminder: !task.reminder} : task))
}
  return (
    <div className="App">
      
      <Header />
      <AddTask onAdd={addTask}/>
      {tasks.length > 0 ?
      <Tasks tasks={tasks} onDelete={deleteTask} reminder={reminder}/> 
      : 'No Tasks to show'}
      
    </div>
  );
}

export default App;
