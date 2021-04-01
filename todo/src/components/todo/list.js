import React from 'react';
import Card from 'react-bootstrap/Card';

import './list.scss';

function TodoList(props) {

    return (
        <ul>
          {props.list.map(item => (
          <Card id="list" bg="light" className={`complete-${item.complete.toString()}`} onClick={() => props.handleComplete(item._id)}
          key={item._id}>
            <Card.Header>{item.assignee}</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>
                  {item.text}
                </p>
                <footer className="blockquote-footer">Difficulty: {item.difficulty}</footer>
              </blockquote>
            </Card.Body>
          </Card>
          ))}
        </ul>
    );
}

export default TodoList;