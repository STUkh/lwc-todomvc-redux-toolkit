import { LightningElement, track } from 'lwc';
import { lwcReduxMixin } from 'c/lwcRedux';
import { dispatch } from 'c/store';
import { todosSlice } from 'c/reduxSlice';
import { pluralize } from 'c/utils';

const { actions } = todosSlice;

const selector = (store) => ({
  todos: store.todos.items,
  filter: store.todos.visibilityFilter
});

// Stateless component that accept activeTodoCount from parent component as param
export default class TodoFooter extends lwcReduxMixin({ mapStateToProps: selector }, LightningElement) {
  @track todos = [];
  @track filter = 'all';

  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  get showClearCompleted() {
    return this.todos.some(todo => todo.completed);
  }

  handleAllFilter(event) {
    event.preventDefault();
    dispatch(actions.setVisibilityFilter('all'));
    // this.dispatchEvent(new CustomEvent('todo_filter_change', { detail: 'all' }));
  }

  handleActiveFilter(event) {
    event.preventDefault();
    dispatch(actions.setVisibilityFilter('active'));
    // this.dispatchEvent(new CustomEvent('todo_filter_change', { detail: 'active' }));
  }

  handleCompletedFilter(event) {
    event.preventDefault();
    dispatch(actions.setVisibilityFilter('completed'));
    // this.dispatchEvent(new CustomEvent('todo_filter_change', { detail: 'completed' }));
  }

  handleClearCompleted(event) {
    event.preventDefault();
    dispatch(actions.clearCompleted(''));
    // this.dispatchEvent(new CustomEvent('todo_clear_completed'));
  }

  get itemsLeftText() {
    return `${pluralize('item', this.activeTodos.length)} left`; 
  }

  // Shame on you, Lightning...
  get allSelectedClass() { return this.filter === 'all' ? 'selected' : ''; }
  get activeSelectedClass() { return this.filter === 'active' ? 'selected' : ''; }
  get completedSelectedClass() { return this.filter === 'completed' ? 'selected' : ''; }
  
}