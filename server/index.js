import express from 'express';

import { makeStore } from '../src/store';
import { setBookList } from '../src/store/bookSlice';
import { setTodoList } from '../src/store/todoSlice';

import { searchBook, searchTodo } from './request';
import { renderHtml } from './utils';

const app = express();
app.use(express.static('client-build'));

app.get('/', async (req, res) => {
  const ssrStore = makeStore();
  // const state = ssrStore.getState();
  // const keyword = state.book.keyword;
  // const data = await searchBook(keyword);
  // ssrStore.dispatch(setBookList(data));
  return renderHtml(res, req, ssrStore);
  // res.send(renderHtml(res, req, ssrStore));
});

app.get('/todo', async (req, res) => {
  const ssrStore = makeStore();
  const data = await searchTodo();
  ssrStore.dispatch(setTodoList(data));
  res.send(renderHtml(res, req, ssrStore));
});

app.get('/api/bookList', async (req, res) => {
  const keyword = req.query.keyword || '刘慈欣';
  const data = await searchBook(keyword);
  res.send(data);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
