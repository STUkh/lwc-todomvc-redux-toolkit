import { LightningElement, api } from 'lwc';
import { classNames } from 'company/reduxLibs';
import { dispatch } from 'company/store';
import { todosSlice } from 'company/reduxSlice';

const { actions } = todosSlice;

// Stateful component that accept particular "todo" from parent component
export default class TodoItem extends LightningElement {
  @api todo;
  isEditing = false;

  toggleComplete() {
    dispatch(actions.toggleTodo(this.todo.id));
  }

  removeTodo() {
    dispatch(actions.removeTodo(this.todo.id));
  }

  startEditing() {
    this.isEditing = true;
    setTimeout(() => { // Timeout to let element appear in DOM and then focus on it
      this.template.querySelector('.edit').focus();
    });
  }

  stopEditing() {
    this.isEditing = false;
  }

  updateTodo(event) {
    const isEmpty = event.target.value.trim() === '';
    if (event.keyCode === 13 && !isEmpty) { // Enter key
      this.stopEditing();

      dispatch(actions.updateTodo({ id: this.todo.id, title: event.target.value.trim() }));
    } else if (event.keyCode === 27) { // ESC key
      this.stopEditing();
    } else if (event.keyCode === 13 && isEmpty) { // Enter + Clear input
      this.removeTodo();
    }
  }

  get todoClasses() {
    return classNames({
      completed: this.todo.completed,
      editing: this.isEditing,
    });
  }

  get viewClasses() {
    return this.isEditing ? 'view hidden' : 'view';
  }

  get editClasses() {
    return this.isEditing ? 'edit' : 'edit hidden';
  }
}