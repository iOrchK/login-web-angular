import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from '../login/shared/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isLoading: boolean;
  public userName: string;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.userName = this.storageService.getCurrentUser().name;
  }

  onCloseSession() {
    this.isLoading = true;
    this.authenticationService
      .logOut(this.storageService.getCurrentSession())
      .subscribe(
        (response) => {
          localStorage.clear();
          this.router.navigate(['login']);
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }
}
