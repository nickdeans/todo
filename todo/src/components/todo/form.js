import React from 'react';
import { useState } from 'react';

function TodoForm(props) {

  const [listItem, setItem] = useState(['listItem']);

  const handleInputChange = e => {
    setItem({ item: {...listItem.item, [e.target.name]: e.target.value }});
  };

  const handleSubmit = (e) => {
    console.log('submitted', e.target);
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(listItem.item);
    const item = {};
    setItem({ item });
  };

    return (
      <>
        <h3>Add Item</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>To Do Item</span>
            <input
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span>Difficulty Rating</span>
            <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
          </label>
          <button>Add Item</button>
        </form>
      </>
    );
}

export default TodoForm;