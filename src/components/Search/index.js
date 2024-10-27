import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectKeyword, setKeyword, getBookList } from '../../store/bookSlice';

import './index.css';

const Search = () => {
  const keyword = useSelector(selectKeyword);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setKeyword(e.target.value));
  };  

  const handleClick = () => {
    if (keyword) {
      dispatch(getBookList());
    }
  };

  return (
    <div className='search-box'>
      <input type="text" onChange={handleChange} value={keyword} placeholder="Search..." />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}

export default Search;