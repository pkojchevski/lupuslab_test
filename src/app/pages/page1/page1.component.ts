import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, switchMap } from 'rxjs';
import { Post } from 'src/app/core/models/Post.model';
import { TableColumn } from 'src/app/core/models/TableColumn.model';
import { PostService } from 'src/app/core/services/post.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.sass']
})

export class Page1Component implements OnInit {
  posts$!: Observable<Post[]>;
  postsTableColumns!: TableColumn[]
  constructor(private postService: PostService, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.initializeColumns()
    this.getPosts()
    this.posts$.subscribe(console.log)
  }

  getPosts() {
    this.posts$ = this.postService.getAllPosts()
  }

  sortData(sortParameters: any) {
    const keyName:string = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.posts$.pipe(map((posts: Post[]) => posts.sort((a: Post, b: Post) => this.compareFn(a, b, keyName))))
    } else if (sortParameters.direction === 'desc') {
      this.posts$.pipe(map((posts: Post[]) => posts.sort((a: Post, b: Post) => this.compareFn(a, b, keyName))))
    } 
  }


  initializeColumns(): void {
    this.postsTableColumns = [
      {
        name: 'Title',
        dataKey: 'title',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Body',
        dataKey: 'body',
        position: 'right',
        isSortable: false
      },
      {
        name: 'UserId',
        dataKey: 'userId',
        position: 'right',
        isSortable: true
      },
    ];
  }

  deletePost(post: Post) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '700px',
      data: {
        cancelText: "Cancel",
                  confirmText: "OK",
                  message: "Are You sure you want to delete this post?",
                  title: 'Delete Confirmation'
      }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.posts$ = this.postService.delete(post.id)
          .pipe(switchMap(() => this.postService.getAllPosts()))
      }
    })
  }

  editPost(post: Post) {
    let dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '700px',
      data: post
    });

    dialogRef.afterClosed().subscribe((updatedPost: Post) => {
      if (updatedPost) {
        this.posts$ = this.postService.update(updatedPost.id, updatedPost)
          .pipe(switchMap(() => this.postService.getAllPosts()))

      }
    })
  }


  compareFn = (a:any, b:any, key: string) => {
    console.log(a[key], b[key])
    if (a[key] < b[key])
      return -1;
    if (a[key] > b[key])
      return 1;
    return 0;
  };

}
