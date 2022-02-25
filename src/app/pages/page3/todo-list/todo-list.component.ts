import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/core/services/todo.service';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { Todo } from '../model/todo.interface';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent implements OnInit {
  todoTitle!: string;
  todos!: Todo[]

  constructor(private todoService: TodoService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos()
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((updatedTodo: Todo) => {
      if (updatedTodo) {
        this.todoService.updateTodo(updatedTodo)
      }
    })
  }


  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id)
    this.todos = this.todoService.getTodos()
  }


}