import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs";

@Injectable()

export class CorsInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const headers = new HttpHeaders({
                "Access-Control-Allow-Origin": "*",
              });
            const cloned = req.clone({headers})
            return next.handle(cloned)
    }

}