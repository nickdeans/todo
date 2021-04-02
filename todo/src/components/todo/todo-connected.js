import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import useAjax from '../../hooks/use-Ajax.js'
import SettingsProvider from '../../context/settings.js'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
// import useForm from '../../hooks/use-form.js';
import axios from 'axios';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);
  const [request, response] = useAjax();
  const [data, setData] = useState();

  useEffect(() => {
    setData(response);
  }, [response]);

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

  const _deleteItem = id => {
    const url = `${todoAPI}/${id}`;
    const options = {
      url: url,
      method: 'delete',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    };
    request(options);
  };

  const _axiosGetItems = async item => {
    const request = await axios({
      method: 'get',
      url: todoAPI,
    });

    const results = request.data.results;
    setList(results);
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

  useEffect(_axiosGetItems, [_toggleComplete, _deleteItem]);
  // useEffect(_getTodoItems, []);

  return (
    <>
      <header>
        <NavBar bg="primary" variant="dark">
          <Nav>
            <Nav.Link href="" className="nav-bar">Home</Nav.Link>
          </Nav>
          <Form>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form>
          <Form inline >
            <FormControl type="text" placeholder="Password" className="mr-sm-2" />
            <Button variant="dark" type="submit">Login</Button>
          </Form>
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
            handleComplete={_toggleComplete} handleDelete={_deleteItem}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;