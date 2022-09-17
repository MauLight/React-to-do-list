import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, {useState} from 'react';
import {nanoid} from 'nanoid';


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const addTask = (name) => {
    const newTask = {id: `todo-${nanoid()}`, name, completed: ''};
    setTasks([...tasks, newTask]);
  };

  function toggleTaskCompleted(id) {
    const updatedTask = tasks.map((task) => {
      if(id === task.id) {
        return {...task, completed: !task.completed};
      }
      return task;
    })
    setTasks(updatedTask)
    console.log(tasks)
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const taskList = tasks?.map((task) => (
    <Todo name={task.name} completed={task.completed} id={task.id} key={task.id} toggleTaskCompleted= {toggleTaskCompleted} deleteTask= {deleteTask} />
  ));
  
  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const taskLength = `${taskList.length} ${taskNoun} remaining.`

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask= {addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>

      <h2 id="list-heading">
        {taskLength}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;