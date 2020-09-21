import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(): boolean {
    // Validar sesión
    if (this.storageService.isAuthenticated()) {
      // Acceso no autorizado - redireccionar al home
      this.router.navigate(['/home']);
      return false;
    }

    // Acceso autorizado
    return true;
  }
}
