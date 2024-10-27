import React from 'react';
import { useSelector } from 'react-redux';

import { selectBookList } from '../../store/bookSlice';

import Search from '../../components/Search';
import Layout from '../../Layout';

import './index.css';

const Book = ({ data }) => {
  return (
    <div className='book'>
      <img src={data.cover} alt={data.title} />
      <h2>{data.title}</h2>
      <p>{data.author}</p>
    </div>
  );
};

function Home() {
  const bookList = useSelector(selectBookList);
  
  return (
    <Layout>
      <div>
        <Search>My React SSR App-Home</Search>
        <div className='book-list'>
          {
            bookList.map((book, index) => (
              <Book key={index} data={book} />
            ))
          }
        </div>
      </div>
    </Layout>
  );
}

export default Home;
