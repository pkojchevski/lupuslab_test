import {tap, first, map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements  CanActivate {

    constructor(private authService:AuthService, private router:Router) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean>  {

        return this.authService.user$.pipe(
            map(user => !!user!.id ),
            tap(allowed => {
                if (!allowed) {
                    this.router.navigateByUrl('/login');
                }
            }),)


    }

}