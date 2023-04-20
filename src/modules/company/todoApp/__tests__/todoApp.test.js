import { createElement } from 'lwc';
import companyTodoApp from '../todoApp';
import { getTodosFromLocalStorage } from '../../../../utils/localStorage';
import { store, dispatch } from '../../../../redux/store';
import { actions } from '../../../../redux/todoApp.slice';

let defaultTodos = [
    { id: 1, title: 'Test todo 1', completed: false },
    { id: 2, title: 'Test todo 2', completed: true },
    { id: 3, title: 'Test todo 3', completed: false }
];

jest.mock('../../../../utils/localStorage', () => ({
    getTodosFromLocalStorage: jest.fn().mockImplementation(() => defaultTodos),
    saveTodosToLocalStorage: jest.fn(),
}));


describe('company-todo-app', () => {
    let todoAppEl;
    let todoAppShadowRoot;
    let appComponent;
    let todoListEl;
    let todoListShadowRoot;
    let todoListComponent;

    beforeEach(() => {
        todoAppEl = createElement('company-todo-app', {
            is: companyTodoApp
        });

        todoAppShadowRoot = todoAppEl.shadowRoot;
        appComponent = todoAppShadowRoot.model;

        dispatch(actions.setTodos(defaultTodos));

        document.body.appendChild(todoAppEl);

        todoListEl = todoAppShadowRoot.querySelector('company-todo-list');
        todoListShadowRoot = todoListEl.shadowRoot;
        todoListComponent = todoListShadowRoot.model;
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // jest.resetAllMocks();
    });

    it('should pass sanity check', () => {
        expect(todoAppEl).toBeInstanceOf(HTMLElement);
        expect(todoAppEl.tagName).toBe('COMPANY-TODO-APP');

        expect(appComponent.todos).toEqual(defaultTodos);
        expect(todoListEl).toBeInstanceOf(HTMLElement);
    });

    it('should change filteredTodos when new filter applied', () => {
        let items;

        dispatch(actions.setVisibilityFilter('all'));
        items = todoListShadowRoot.querySelectorAll('company-todo-item');
        expect(items.length).toBe(3);
        expect(todoListComponent.filteredTodos).toEqual(defaultTodos);

        dispatch(actions.setVisibilityFilter('completed'));
        // In DOM items hidden by class and this mean we always get 3 DOM Nodes
        items = todoListShadowRoot.querySelectorAll('company-todo-item');
        expect(items.length).toBe(3);
        expect(todoListComponent.filteredTodos).toEqual([{ completed: true, id: 2, title: "Test todo 2"}]);

        dispatch(actions.setVisibilityFilter('active'));
        items = todoListShadowRoot.querySelectorAll('company-todo-item');
        expect(items.length).toBe(3);
        expect(todoListComponent.filteredTodos).toEqual([
            { completed: false, id: 1, title: "Test todo 1"},
            { completed: false, id: 3, title: "Test todo 3"},
        ]);
    });
});
