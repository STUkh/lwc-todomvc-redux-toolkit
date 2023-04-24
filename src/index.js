import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import SparkyTodoApp from '../force-app/main/default/lwc/todoApp/todoApp';

const app = createElement('company-todo-app', { is: SparkyTodoApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.body.appendChild(app);
