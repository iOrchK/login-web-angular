import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthorizatedGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Validar sesión
    if (this.storageService.isAuthenticated()) {
      // Validar permisos de ruta
      if (
        route.data.roles &&
        route.data.roles.indexOf(this.storageService.getCurrentRole()) === -1
      ) {
        // Acceso no autorizado - redireccionar al home
        this.router.navigate(['/home']);
        return false;
      }

      // Acceso autorizado
      return true;
    }

    // Acceso no autorizado
    this.router.navigate(['/login']);
    return false;
  }
}
