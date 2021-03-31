import React from 'react';
import Card from 'react-bootstrap/Card';

function TodoList(props) {

    return (
      <Card>
        <ul>
          <Card.Body>
          {props.list.map(item => (
            <li
              className={`complete-${item.complete.toString()}`}
              key={item._id}
            >
              <span onClick={() => props.handleComplete(item._id)}>
                {item.text}
              </span>
            </li>
          ))}
          </Card.Body>
        </ul>
      </Card>
    );
}

export default TodoList;