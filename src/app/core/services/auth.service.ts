import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';


export const ANONYMOUS_USER = {
  id: 0,
  email: "",
  password: ""
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private toaster: ToastrService ) { }

  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user!.id));

  login(email:string, password:string) {
      return this.http.get<User>(environment.loginUrl)
      .pipe(
          map((users: any) => 
               users.find((user: User) => user.email === email && user.password === password)
          ),
             tap((user: User) => {
               console.log(user)
               if(!user) this.toaster.error("Wrong credentials", "Error", { closeButton: true });
               
               this.subject.next(user)
               
              })
          )
  }

  logout() {
      return this.subject.next(ANONYMOUS_USER)
  }
}
