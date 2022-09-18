import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const DATA = [
  {id: 'todo-1', name: 'Write first act of outline', completed: true},
  {id: 'todo-2', name: 'Write first part of second act of outline', completed: false},
  {id: 'todo-3', name: 'Write second part of second act of outline', completed: false},
  {id: 'todo-4', name: 'Write third act of outline', completed: false},
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App tasks= {DATA} />

);
