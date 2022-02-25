import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup
  serverMessage!: string 
  loading: boolean = false
  subscription: Subscription | undefined
  
  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      email:['test@test.com', [Validators.required, Validators.email]],
      password:['password', [Validators.required, Validators.minLength(6)]],
    })

  }


  get email() {
    return this.form?.get('email')
  }

  get password() {
    return this.form?.get('password')
  }

  onSubmit() {
    if (this.form.invalid) return

    const { email, password } = this.form.value
    this.subscription = this.authService.login(email, password)
                .pipe(
                  tap(() => {
                        console.log("User is logged in");
                        this.router.navigateByUrl('/page1');
                    })
                ).subscribe()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

}
