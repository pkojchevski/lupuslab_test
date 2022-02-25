import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { CorsInterceptor } from './cors.interceptor';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpLoaderInterceptor } from './http-loader.interceptor';


export const interceptorProviders = 
   [
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true },
];