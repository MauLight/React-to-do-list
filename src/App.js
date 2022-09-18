import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, {useState, useRef, useEffect} from 'react';
import {nanoid} from 'nanoid';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};



const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const addTask = (name) => {
    const newTask = {id: `todo-${nanoid()}`, name, completed: ''};
    setTasks([...tasks, newTask]);
  };

  const [filter, setFilter] = useState('All');
  console.log(FILTER_MAP[filter]);

  const filterList = FILTER_NAMES.map((name) => {
    return <FilterButton key= {name} name= {name} isPressed= {name=== filter} setFilter= {setFilter} />
  })

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

  const editTask = (id, newName) => {
    const editedTasksList = tasks.map((task) => {
      if(id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTasksList);
  };

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  
  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const taskLength = `${taskList.length} ${taskNoun} remaining.`;

  const listHeadingRef= useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>To-Do List</h1>
      <Form addTask= {addTask}/>
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>

      <h2 id="list-heading" tabIndex= '-1' ref= {listHeadingRef}>
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