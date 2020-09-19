import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public name: string;
  public email: string;
  public password: string;

  constructor() {}

  ngOnInit(): void {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  handleName() {
    console.log(this.name);
  }

  handleEmail() {
    console.log(this.email);
  }

  handlePassword() {
    console.log(this.password);
  }

  onRegister() {
    if (this.name && this.email && this.password) {
      alert(
        'User registered. Now you can Log In with your email and password.'
      );
      this.ngOnInit();
      return;
    }
    alert('Please check the fileds');
  }
}
