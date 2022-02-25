import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription, tap } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = of(false)
  isLoading: boolean = false
  subscription: Subscription | undefined
  constructor(private authService: AuthService, private router: Router, public loading: LoadingService) {}

  ngOnInit(): void {

    this.isLoggedIn$ = this.authService.isLoggedIn$
        .pipe(tap((isLog:boolean) => 
              isLog ? this.router.navigateByUrl('/page1')
              : this.router.navigateByUrl('/login')))
  }

  logout() {
    this.authService.logout(); 
  }

 


}
