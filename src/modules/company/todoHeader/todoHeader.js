import { LightningElement, track } from 'lwc';
import { lwcReduxMixin } from '../../../redux/lwc-redux.component.js';
import { actions } from '../../../redux/todoApp.slice.js';
import { dispatch } from '../../../redux/store.js';

const selector = (store) => ({
  todos: store.todos.items,
  filter: store.todos.visibilityFilter
});

// Stateless component that emit event to parent
export default class TodoHeader extends lwcReduxMixin({ mapStateToProps: selector }, LightningElement) {
  @track todos;
  
  addTodo(event) {
    if (event.keyCode === 13 && event.target.value.trim() !== '') { // Enter key
      const dateNum = Number(new Date());
      dispatch(actions.addTodo({
        id: dateNum,
        completed: false,
        title: event.target.value
      }));
      // this.dispatchEvent(new CustomEvent('todo_add', { detail: event.target.value }));
      event.target.value = ''; // Clear input
    }
  }

  switchAll() {
    dispatch(actions.toggleAll(!this.allCompleted))
  }

  get allCompleted() {
    return this.todos.every(todo => todo.completed);
  }
}