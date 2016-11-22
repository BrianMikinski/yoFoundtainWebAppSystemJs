import {SHOW_ALL} from '../constants/TodoFilters.ts';
import {initialTodo, Todo} from '../todos/todos.ts';

class AppController {
  todos: Todo[];
  filter: string;

  constructor() {
    this.todos = [initialTodo];
    this.filter = SHOW_ALL;
  }
}

export const App: angular.IComponentOptions = {
  templateUrl: 'src/app/containers/App.html',
  controller: AppController
};
