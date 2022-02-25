import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Post } from '../models/Post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.postsUrl)
  }

  create(post: Post) {
    return this.http.post<Post>(environment.postsUrl, post);
  }

  update(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.postsUrl}/${id}`, post);
  }

  delete(id: string) {
    return this.http.delete<any>(`${environment.postsUrl}/${id}`);
  }
}
