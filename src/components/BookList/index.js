import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { useEventEmitter } from '../../context';

const getBookList = async (keyword) => {
  const response = await fetch(
    `https://book-db-v1.saltyleo.com/?keyword=${keyword}`,
  );
  return await response.json();
};

const Book = ({ data }) => {
  return (
    <div className="book">
      <img src={data.cover} alt={data.title} />
      <h2>{data.title}</h2>
      <p>{data.author}</p>
    </div>
  );
};

const BookList = () => {
  const query = useQuery({
    queryKey: ['bookList'],
    queryFn: () => getBookList('刘慈欣'),
  });
  const ee = useEventEmitter();
  if (ee && query.data) {
    ee.emit('updateState');
  }

  return (
    <div className="book-list">
      {query.data.map((book, index) => (
        <Book key={index} data={book} />
      ))}
    </div>
  );
};

export default BookList;
