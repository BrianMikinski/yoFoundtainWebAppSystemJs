import {TodoService, Todo} from '../todos/todos.ts';

class HeaderController {
  todos: Todo[];

  constructor(public todoService: TodoService) {
  }

  handleSave(text: string) {
    if (text.length !== 0) {
      this.todos = this.todoService.addTodo(text, this.todos);
    }
  }
}

export const Header: angular.IComponentOptions = {
  templateUrl: 'src/app/components/Header.html',
  controller: ['todoService', HeaderController],
  bindings: {
    todos: '='
  }
};
