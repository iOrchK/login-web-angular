import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../core/models/User.model';
import { AuthenticationService } from '../login/shared/authentication.service';
import { StorageService } from '../core/services/storage.service';
import { SecurityDataService } from '../core/services/security-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [StorageService, AuthenticationService],
})
export class RegisterComponent implements OnInit {
  public isLoading: boolean;
  public loginForm: FormGroup;
  public user: User;
  public errorName: string;
  public errorEmail: string;
  public errorPassword: string;

  private validations: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private securityDataService: SecurityDataService
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.validations = {
      REQUIRED: 'Campo requerido',
      EMAIL: 'No es un correo electrónico',
    };
    this.errorName = this.validations.REQUIRED;
    this.errorEmail = this.validations.REQUIRED;
    this.errorPassword = this.validations.REQUIRED;
    this.isLoading = false;
  }

  handleName() {
    this.errorName = this.loginForm.controls.name.hasError('required')
      ? this.validations.REQUIRED
      : null;
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

  onRegister() {
    if (!this.formIsValid()) {
      return;
    }
    this.isLoading = true;
    const newUser = new User(this.loginForm.value);
    newUser.password = this.securityDataService.CipherText(newUser.password);
    this.authService.create(newUser).subscribe(
      (response) => {
        Swal.fire({
          title: 'Éxito!',
          text: `Ya puedes acceder con tu correo ${response.email} y la contraseña que registraste`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.ngOnInit();
      },
      (error) => {
        this.isLoading = false;
        let { message } = error.error;
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      }
    );
  }
}
