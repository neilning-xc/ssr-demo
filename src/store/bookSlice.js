import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    keyword: '刘慈欣',
    bookList: [],
  },
  reducers: {
    setBookList: (state, action) => {
      state.bookList = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const selectBookList = (state) => state.book.bookList;
export const selectKeyword = (state) => state.book.keyword;
export const { setBookList, setKeyword } = bookSlice.actions;

export const getBookList = () => {
  return (dispatch, getState) => {
    const state = getState();
    const keyword = state.book.keyword;
    return fetch(`/api/bookList?keyword=${keyword}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setBookList(data));
      });
  };
};

export default bookSlice.reducer;
