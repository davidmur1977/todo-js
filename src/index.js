
import {Todo, TodoList} from './classes';
import {crearTodoHtml} from './js/componentes';
import './styles.css';



export const todoList = new TodoList();

console.log(todoList.todos);

todoList.todos.forEach(todo => crearTodoHtml(todo) );

