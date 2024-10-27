import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTodoList, selectFilter, setFilter, setTodo, addTodo } from '../../store/todoSlice';

import Layout from '../../Layout';

import './index.css';

const Item = ({ data }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setTodo({id: data.id}));
  };

  return (
    <div className='todo'>
      <input type="checkbox" onChange={handleChange} checked={data.completed} />
      <h3>{data.title}</h3>
    </div>
  );
}

function Todo() {
  const [inputValue, setInputValue] = useState('');

  const todoList = useSelector(selectTodoList);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addTodo(inputValue));
    setInputValue('');
  };

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };
  
  return (
    <Layout>
      <div>
        <div className='todo-add'>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={handleClick}>Add</button>
        </div>
        <div className='todo-filter'>
          <input type="radio" id="filter1" name="filter" value="all" checked={filter === 'all'} onChange={handleChange} />
          <label htmlFor="filter1">All</label>

          <input type="radio" id="filter2" name="filter" value="completed" checked={filter === 'complete'} onChange={handleChange} />
          <label htmlFor="filter2">Completed</label>

          <input type="radio" id="filter3" name="filter" value="incomplete" checked={filter === 'incomplete'} onChange={handleChange} />
          <label htmlFor="filter3">InComplete</label>
        </div>
        <div className='todo-list'>
          {
            todoList.filter((todo) => {
              if (filter === 'all') {
                return true;
              } else if (filter === 'completed') {
                return todo.completed;
              } else {
                return !todo.completed;
              }
            }).map((todo, index) => (
              <Item key={index} data={todo} />
            ))
          }
        </div>
      </div>
    </Layout>
  );
}

export default Todo;
