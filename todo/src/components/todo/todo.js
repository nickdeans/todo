import { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



import './todo.scss';

function ToDo() {

  const [list, setList] = useState([]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      setList(list.map(listItem => listItem._id === item._id ? item : listItem));
    }

  };

  useEffect(() => {
    setList([
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ]);
  }, []);

  useEffect(() => {
    document.title = console.log('test');
  }, [list]);


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
          <TodoForm handleSubmit={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
          />
        </div>
      </section>
    </>
  );
}

export default ToDo;