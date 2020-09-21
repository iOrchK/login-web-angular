import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginObject } from './shared/login-object.model';
import { AuthenticationService } from './shared/authentication.service';
import { StorageService } from '../core/services/storage.service';
import { Session } from '../core/models/session.model';
import { SecurityDataService } from '../core/services/security-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public login: LoginObject;
  public errorEmail: string;
  public errorPassword: string;
  public isLoading: boolean;

  private validations: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private authService: AuthenticationService,
    private securityDataService: SecurityDataService
  ) {}

  ngOnInit(): void {
    this.login = new LoginObject();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.validations = {
      REQUIRED: 'Campo requerido',
      EMAIL: 'No es un correo electrónico',
    };
    this.errorEmail = this.validations.REQUIRED;
    this.errorPassword = this.validations.REQUIRED;
    this.isLoading = false;
  }

  handleEmail() {
    let { email } = this.loginForm.controls;
    if (email.hasError('required')) {
      this.errorEmail = this.validations.REQUIRED;
      return;
    }
    if (email.hasError('email')) {
      this.errorEmail = this.validations.EMAIL;
      return;
    }
    this.errorEmail = null;
  }

  handlePassword() {
    this.errorPassword = this.loginForm.controls.password.hasError('required')
      ? this.validations.REQUIRED
      : null;
  }

  formIsValid() {
    return this.loginForm.dirty && this.loginForm.valid;
  }

  onLogIn() {
    if (!this.formIsValid()) {
      return;
    }
    this.isLoading = true;
    const newLogin = new LoginObject(this.loginForm.value);
    const ciphertext = this.securityDataService.CipherText(newLogin.password);
    newLogin.password = ciphertext;
    this.authService.logIn(newLogin).subscribe(
      (response) => {
        this.setSession(new Session(response));
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  private setSession(data: Session) {
    this.storageService.setCurrentSession(data);
    this.router.navigate(['home']);
  }
}
