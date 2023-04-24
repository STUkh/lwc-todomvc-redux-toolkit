// todo-app.js
import { LightningElement, track, wire } from 'lwc';
import { lwcReduxMixin } from 'c/lwcRedux';
import { dispatch } from 'c/store';
import { getTodosFromLocalStorage } from 'c/utils';
import { todosSlice } from 'c/reduxSlice';

import todoWireAdapter from '@salesforce/apex/TodoAppService.todoWireAdapter';

const selector = (store) => ({
  todos: store.todos.items
});

export default class TodoApp extends lwcReduxMixin({ mapStateToProps: selector }, LightningElement) {
  @track todos = getTodosFromLocalStorage();

  // Params for @wire adapter. Not used elsewhere in app
  @track skip = 0;
  @track limit = 5;

  // Fetch data from server. 2nd argument in param with $ prefix. Example: { type: '$filter' }
  // eslint-disable-next-line @lwc/lwc/no-unknown-wire-adapters
  @wire(todoWireAdapter, { skip: '$skip', limit: '$limit'})
  wireTodos({ error, data }) {
    // Load only if localStorage is empty  
    const localTodos = getTodosFromLocalStorage();
    const dataset = localTodos?.items?.length ? localTodos.items : data;

    if (dataset) {
      dispatch(todosSlice.actions.setTodos(dataset));
    } else if (error) {
        this.error = error;
    }
  }

  constructor() {
    super();
    this.template.model = this; // Require for testing
  }
}