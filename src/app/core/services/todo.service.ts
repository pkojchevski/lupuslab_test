import { Injectable } from '@angular/core';
import { Todo } from '../../pages/page3/model/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoTitle: string = '';
  idForTodo: number = 0;
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todos: Todo[] = []

  constructor() { }

  addTodo(text: string): void {
    this.todos.push({
      id: this.idForTodo,
      text,
      completed: false,
      editing: false
    })

    this.idForTodo++;
  }

  updateTodo(todo: Todo): void {
     this.todos[todo.id] = todo
     console.log('edit this.todos:', todo.id, this.todos)
  }


  cancelEdit(todo: Todo): void {
    todo.text = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    console.log('this.todos:', id, this.todos)
  }


  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos(): void {
  }


  getTodos():Todo[] {
    return this.todos
  }
}
