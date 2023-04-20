import { createSlice } from '../resources/scripts/redux-toolkit.umd.min.js';

const defaultState = {
  visibilityFilter: 'all',
  items: []
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: defaultState,
  reducers: {
      setTodos: (state, { payload }) => {
        state.items = payload;
      },
      // Define actions and their corresponding state changes
      addTodo: (state, { payload }) => {
        // Add a new todo to the state
        state.items.push(payload);
      },
      toggleTodo: (state, { payload }) => {
        // Toggle the 'completed' status of a todo
        const todo = state.items.find((t) => t.id === payload);
        if (todo) {
          todo.completed = !todo.completed;
        }
      },
      removeTodo: (state, { payload }) => {
        // Remove a todo from the state by its id
        const index = state.items.findIndex(todo => todo.id === payload);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      },
      updateTodo: (state, { payload }) => {
        const todo = state.items.find((t) => t.id === payload.id);
        todo.title = payload.title;
      },
      toggleAll: (state, { payload }) => {
        state.items.forEach((t) => { t.completed = payload });
      },
      clearCompleted: (state) => {
        state.items = state.items.filter((todo) => todo.completed === false);
      },
      setVisibilityFilter: (state, { payload }) => {
        state.visibilityFilter = payload;
      }
  },
});

export const { addTodo, toggleTodo, deleteTodo, setVisibilityFilter, clearCompleted } = todosSlice.actions;
export const { reducer: todosReducer, actions } = todosSlice;

export default todosSlice;