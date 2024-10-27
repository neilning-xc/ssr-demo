import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    filter: 'all',
    todoList: [],
  },
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    finishTodo: (state, action) => {
      const id = action.payload.id;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      state.todoList[index].completed = true;
    },
    addTodo: (state, action) => {
      const title = action.payload;
      const id = state.todoList.length + 1;
      state.todoList.push({ id, title, completed: false });
    },
  },
});

export const selectTodoList = (state) => state.todo.todoList;
export const selectFilter = (state) => state.todo.filter;
export const { setTodoList, setFilter, setTodo, addTodo } = todoSlice.actions;

export default todoSlice.reducer;