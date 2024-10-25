import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../servicios/auth/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  
  userName: string = '';
  userLoginOn: boolean = false;
  loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginStatus) => {
        this.userLoginOn = userLoginStatus;
      },
    });
    this.loginService.currentUserData.subscribe({
      next: (data) => {
        this.userName = data.username;
      },
    });
  }

  public logout() {
    this.loginService.logout();
  }
}
