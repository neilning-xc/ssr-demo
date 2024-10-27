export const searchBook = (keyword) => {
  return fetch(`https://book-db-v1.saltyleo.com/?keyword=${keyword}`).then(
    (res) => res.json(),
  );
};

export const searchTodo = () => {
  return Promise.resolve([
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ]);
};
