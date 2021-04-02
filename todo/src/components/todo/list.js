import React from 'react';
import Card from 'react-bootstrap/Card';
import ToastHeader from 'react-bootstrap/esm/ToastHeader';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';

import './list.scss';

function TodoList(props) {

  const styles = {
    pill: { cursor: 'pointer' },
  };

    return (
        <ul>
          {props.list.map(item => (
            <Card id="list" bg="light" className={`complete-${item.complete.toString()}`} onClick={() => props.handleComplete(item._id)}
            key={item._id}>
            <Toast.Header className="exit-button" key={item._id} onClose={() => props.handleDelete(item._id)}>
              <Badge
                pillstyle={styles.pill}
                variant={item.complete ? 'danger' : 'success'}
                onClick={() => props.handleComplete(item._id)}
              >
                {!item.complete ? 'Pending' : 'Complete'}
              </Badge>
              <strong className="mr-auto">{item.assignee}</strong>
            </Toast.Header>
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