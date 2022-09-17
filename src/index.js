import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const DATA = [
  {id: 'todo-1', name: 'eat', completed: true},
  {id: 'todo-2', name: 'work', completed: false},
  {id: 'todo-3', name: 'sleep', completed: false},
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App tasks= {DATA} />

);
