import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, of, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
   import { ToastrService } from 'ngx-toastr';
   import { Injectable } from '@angular/core';
   
   @Injectable()
   export class HttpErrorInterceptor implements HttpInterceptor {
    
    constructor(private toasterService: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
              this.toasterService.error(error.message, error.name, { closeButton: true });

            } else {
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              this.toasterService.error(error.message, error.name, { closeButton: true });
            }

            return throwError(() => of(error));
          })
        )
    }

   }