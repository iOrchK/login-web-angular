import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from 'src/app/core/models/session.model';
import { environment } from '../../../environments/environment';
import { User } from '../../core/models/User.model';
import { LoginObject } from './login-object.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private url: string = `${environment.api_url}/authentication`;

  constructor(private http: HttpClient) {}

  public create(body: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, body);
  }

  public logIn(body: LoginObject): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, body);
  }

  public logOut(session: Session): Observable<any> {
    return this.http.post(`${this.url}/logout`, session);
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     this.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // }
}
