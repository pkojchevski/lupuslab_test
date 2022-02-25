import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/core/models/Post.model';
import { EditTodoDialogComponent } from '../../page3/edit-todo-dialog/edit-todo-dialog.component';


@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.sass']
})

export class EditPostDialogComponent implements OnInit {
  postForm!: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public post: Post) { }

  ngOnInit(): void {
    console.log('post:', this.post)
     this.postForm = this.fb.group({
       title:[],
       body:[]
     })
  }

  close() {
    this.dialogRef.close()
  }
  
  onSubmit() {
    if (this.postForm.invalid) return
    const {title, body} = this.postForm.value
    const updatedPost = {
      ...this.post,
      title: title.inputValue,
      body: body.inputValue
    }

    this.dialogRef.close(updatedPost)
  }


}
