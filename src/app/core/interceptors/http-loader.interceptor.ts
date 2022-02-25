
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {finalize} from 'rxjs/operators'
import {LoadingService} from '../services/loader.service';


@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

  constructor(
    private loading: LoadingService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loading.setLoading(true, request.url);

    return next
      .handle(request)
      .pipe(finalize(() => this.loading.setLoading(false, request.url)));
  }
}