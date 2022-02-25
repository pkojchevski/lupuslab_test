import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Page3Component } from './page3.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Page3RoutingModule } from './page3.routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';



@NgModule({
  declarations: [
    Page3Component,
    TodoItemComponent,
    TodoListComponent,
    EditTodoDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    Page3RoutingModule
  ]
})
export class Page3Module { }
