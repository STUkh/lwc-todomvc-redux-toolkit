import { createElement } from 'lwc';
import TodoApp from '../todoApp';
import { dispatch } from '../../store/store';
import { actions } from '../../reduxSlice/todoApp.slice';

import todoWireAdapter from '@salesforce/apex/TodoAppService.todoWireAdapter';

// Setup default data
const defaultTodos = Object.freeze([
    { id: 1, title: 'Test todo 1', completed: false },
    { id: 2, title: 'Test todo 2', completed: true },
    { id: 3, title: 'Test todo 3', completed: false }
]);

// Setup mocks for wire adapters
jest.mock('@salesforce/apex/TodoAppService.todoWireAdapter',
    () => {
        const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
        return {
            default: createApexTestWireAdapter(jest.fn())
        };
    },
    { virtual: true }
);

describe('c-todo-app', () => {
    let todoAppEl;
    let todoAppShadowRoot;
    let appComponent;
    let todoListEl;
    let todoListShadowRoot;
    let todoListComponent;

    beforeEach(() => {
        todoAppEl = createElement('c-todo-app', {
            is: TodoApp
        });

        todoAppShadowRoot = todoAppEl.shadowRoot;
        appComponent = todoAppShadowRoot.model;
        
        // You can do any - "dispatch" or "todoWireAdapter.emit" to init data
        // dispatch(actions.setTodos(defaultTodos));
        todoWireAdapter.emit(defaultTodos);

        document.body.appendChild(todoAppEl);

        todoListEl = todoAppShadowRoot.querySelector('c-todo-list');
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
        expect(todoAppEl.tagName).toBe('C-TODO-APP');

        expect(appComponent.todos).toEqual(defaultTodos);
        expect(todoListEl).toBeInstanceOf(HTMLElement);
    });

    it('should change filteredTodos when new filter applied', () => {
        let items;

        dispatch(actions.setVisibilityFilter('all'));
        items = todoListShadowRoot.querySelectorAll('c-todo-item');
        expect(items.length).toBe(3);
        expect(todoListComponent.filteredTodos).toEqual(defaultTodos);

        dispatch(actions.setVisibilityFilter('completed'));
        // In DOM items hidden by class and this mean we always get 3 DOM Nodes
        items = todoListShadowRoot.querySelectorAll('c-todo-item');
        expect(items.length).toBe(3);
        expect(todoListComponent.filteredTodos).toEqual([{ completed: true, id: 2, title: "Test todo 2"}]);

        dispatch(actions.setVisibilityFilter('active'));
        items = todoListShadowRoot.querySelectorAll('c-todo-item');
        expect(items.length).toBe(3);
        expect(todoListComponent.filteredTodos).toEqual([
            { completed: false, id: 1, title: "Test todo 1"},
            { completed: false, id: 3, title: "Test todo 3"},
        ]);
    });
});
