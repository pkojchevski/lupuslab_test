import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../model/todo.interface';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.sass']
})


export class EditTodoDialogComponent implements OnInit {
  todoForm!: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) { }

  ngOnInit(): void {
     this.todoForm = this.fb.group({
       textTodo:[]
     })
  }

  get textTodo() {
    return this.todoForm.get('textTodo')
  }

  close() {
    this.dialogRef.close()
  }
  
  onSubmit() {
    if (this.todoForm.invalid) return
    
    const { inputValue } = this.textTodo?.value
    const updatedTodo = {
      ...this.todo,
      text: inputValue
    }

    this.dialogRef.close(updatedTodo)
  }

}


