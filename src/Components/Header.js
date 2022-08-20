import Button from './Button'
const Header = ({ onAdd, showAdd}) => {

  

  return (
    
      <header className="header">
        <h1>Task Tracker React App with State</h1>
        
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close Menu' : 'Add Task'} onClick={onAdd} />
        
      </header>
      
    
  )
}



export default Header