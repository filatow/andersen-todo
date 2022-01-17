import { TodoList } from './TodoList';
import { mockTasks } from './mock';

const init = () => {
  const todoListContainer = document.querySelector('#todo-list-container');
  const todoList = new TodoList(todoListContainer, mockTasks);
};

init();
