import visibilityFilters from '../constants/VisibilityFilters.ts';
import {TodoService, Todo} from '../todos/todos.ts';

class MainSectionController {
  selectedFilter: Function;
  filter: string;
  completeReducer: Function;
  todos: any[];

  constructor(public todoService: TodoService) {
    this.selectedFilter = visibilityFilters[this.filter];
    this.completeReducer = (count: number, todo: Todo): number => todo.completed ? count + 1 : count;
  }

  handleClearCompleted() {
    this.todos = this.todoService.clearCompleted(this.todos);
  }

  handleCompleteAll() {
    this.todos = this.todoService.completeAll(this.todos);
  }

  handleShow(filter: string) {
    this.filter = filter;
    this.selectedFilter = visibilityFilters[filter];
  }

  handleChange(id: number) {
    this.todos = this.todoService.completeTodo(id, this.todos);
  }

  handleSave(e: any) {
    if (e.text.length === 0) {
      this.todos = this.todoService.deleteTodo(e.id, this.todos);
    } else {
      this.todos = this.todoService.editTodo(e.id, e.text, this.todos);
    }
  }

  handleDestroy(e: any) {
    this.todos = this.todoService.deleteTodo(e, this.todos);
  }
}

export const MainSection: angular.IComponentOptions = {
  templateUrl: 'src/app/components/MainSection.html',
  controller: ['todoService', MainSectionController],
  bindings: {
    todos: '=',
    filter: '<'
  }
};
