import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginObject } from './shared/login-object.model';
import { AuthenticationService } from './shared/authentication.service';
import { StorageService } from '../core/services/storage.service';
import { Session } from '../core/models/session.model';
import { SecurityDataService } from '../core/services/security-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService],
})
export class LoginComponent implements OnInit {
  public login: LoginObject;
  private validations: any;
  public errorEmail: string;
  public errorPassword: string;
  public statusSuccess: number[];
  public isLoading: boolean;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthenticationService,
    private securityDataService: SecurityDataService
  ) {}

  ngOnInit(): void {
    this.login = new LoginObject();
    this.validations = {
      REQUIRED: 'Campo requerido',
    };
    this.errorEmail = this.validations.REQUIRED;
    this.errorPassword = this.validations.REQUIRED;
    this.statusSuccess = [200, 201];
    this.isLoading = false;
  }

  handleEmail() {
    this.errorEmail = !this.login.email ? this.validations.REQUIRED : null;
  }

  handlePassword() {
    this.errorPassword = !this.login.password
      ? this.validations.REQUIRED
      : null;
  }

  validateForm() {
    return this.errorEmail || this.errorPassword;
  }

  onLogIn() {
    if (!this.login.email || !this.login.password) {
      return;
    }
    this.isLoading = true;
    const newLogin = new LoginObject(this.login);
    const ciphertext = this.securityDataService.CipherText(newLogin.password);
    console.log(ciphertext);
    newLogin.password = ciphertext;
    this.authService.logIn(newLogin).subscribe(
      (response) => {
        this.setSession(new Session(response));
      },
      (error) => {
        this.isLoading = false;
        let { message } = error.error;
        if (!message) {
          message = 'La conexión a la fuente de datos ha fallado';
        }
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      }
    );
  }

  private setSession(data: Session) {
    this.storageService.setCurrentSession(data);
    this.router.navigate(['home']);
  }
}
