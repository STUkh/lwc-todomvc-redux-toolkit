// Method to get and parse saved values
export const getTodosFromLocalStorage = () => {
    const storedTodos = localStorage.getItem('todos') || localStorage.getItem('LSKey[c]todos');
    return storedTodos ? JSON.parse(storedTodos) : null;
};

// Method to save items to local storage
export const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
