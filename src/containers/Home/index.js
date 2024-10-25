import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookList, getBookList } from '../../store/bookSlice';

import Layout from '../../Layout';

import './index.css';

const Book = ({ data }) => {
  // console.log("🚀 ~ Book ~ data:", data)
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
  console.log("🚀 ~ Home ~ bookList:", bookList)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getBookList());
  // }, []);
  
  return (
    <Layout>
      <div>
        <h1>My React SSR App-Home</h1>
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
