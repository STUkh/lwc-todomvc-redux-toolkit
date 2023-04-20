import { LightningElement, track } from 'lwc';
import { lwcReduxMixin } from '../../../redux/lwc-redux.component.js';

const selector = (store) => ({
  todos: store.todos.items,
  filter: store.todos.visibilityFilter
});

// Stateles component that accept "todos" from parent as parameter by @api decorator
export default class TodoList extends lwcReduxMixin({ mapStateToProps: selector }, LightningElement) {
  @track todos;
  @track filter;
  
  constructor() {
    super();
    this.template.model = this; // Require for testing
  }

  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }
}
