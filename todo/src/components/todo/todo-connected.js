import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => setList(data.results))
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);

  return (
    <>
      <header>
      <NavBar bg="primary" variant="dark">
          <Nav>
            <Nav.Link href="">Home</Nav.Link>
          </Nav>
        </NavBar>
        <NavBar bg="dark" variant="light" className="nav-two">
          <Nav>
            <h2>
              To Do List Manager ({list.filter(item => !item.complete).length})
            </h2>
          </Nav>
        </NavBar>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;