import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.sass']
})
export class Page3Component implements OnInit {
  todoForm!: FormGroup;
  constructor(private fb: FormBuilder, private todoService: TodoService) { }

  ngOnInit(): void {

    this.todoForm = this.fb.group({
      todoText:[],
    })

  }


  get todoText() {
    return this.todoForm?.get('todoText')
  }

  addTodo(): void {
    
  }



  resetForm() {
    this.todoForm.reset();
  }


  async onSubmit() {
    if(!this.todoForm.valid) return;
    console.log(this.todoText?.value)
    const {inputValue} = this.todoText?.value

    this.todoService.addTodo(inputValue);

    this.todoForm.reset()

  }

}
