import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
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
  public registerForm: FormGroup;
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
    this.registerForm = this.formBuilder.group({
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
    this.errorName = this.registerForm.controls.name.hasError('required')
      ? this.validations.REQUIRED
      : null;
  }

  handleEmail() {
    let { email } = this.registerForm.controls;
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
    this.errorPassword = this.registerForm.controls.password.hasError(
      'required'
    )
      ? this.validations.REQUIRED
      : null;
  }

  formIsValid() {
    return this.registerForm.dirty && this.registerForm.valid;
  }

  onRegister() {
    if (!this.formIsValid()) {
      return;
    }
    this.isLoading = true;
    const newUser = new User(this.registerForm.value);
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
      }
    );
  }
}
