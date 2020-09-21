import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { finalize, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.getCurrentToken();
    const started = Date.now();
    let ok: string;

    if (!token) {
      return next.handle(req).pipe(
        tap(
          // Consulta exitosa
          (event) => {
            ok = event instanceof HttpResponse ? 'succeeded' : '';
          },
          // Error en la consulta
          (error) => {
            ok = 'failed';
            try {
              Swal.fire({
                title: 'Error!',
                text: error.error.message,
                icon: 'error',
                confirmButtonText: 'Cerrar',
              });
            } catch (e) {
              Swal.fire({
                title: 'Error!',
                text: 'La conexión ha fallado',
                icon: 'error',
                confirmButtonText: 'Cerrar',
              });
            }
          }
        ),
        // Acciones al finalizar la consulta
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          console.log(msg);
        })
      );
    }

    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req).pipe(
      tap(
        // Consulta exitosa
        (event) => {
          ok = event instanceof HttpResponse ? 'succeeded' : '';
        },
        // Error en la consulta
        (error) => {
          ok = 'failed';
          try {
            Swal.fire({
              title: 'Error!',
              text: error.error.message,
              icon: 'error',
              confirmButtonText: 'Cerrar',
            });
          } catch (e) {
            Swal.fire({
              title: 'Error!',
              text: 'La conexión ha fallado',
              icon: 'error',
              confirmButtonText: 'Cerrar',
            });
          }
        }
      ),
      // Acciones al finalizar la consulta
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        console.log(msg);
      })
    );
  }
}
