import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router, private dataService: DataService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = this.dataService.sesionState === 1 ? true : false; // Validamos si el usuario está autenticado
      if (isAuth) {
        return true; // Si el usuario está autenticado, permitimos el acceso
      } else {
        this.router.navigate(['/']); // Si el usuario no está autenticado, lo redirigimos a la página de inicio de sesión
        return false; // Denegamos el acceso
      }
  }
}
