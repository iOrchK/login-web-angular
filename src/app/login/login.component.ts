import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  handleEmail() {
    console.log(this.email);
  }

  handlePassword() {
    console.log(this.password);
  }

  onLogIn() {
    if (this.email && this.password) {
      this.ngOnInit();
      this.router.navigate(['home']);
      return;
    }
    alert('Please check the fields');
  }
}
