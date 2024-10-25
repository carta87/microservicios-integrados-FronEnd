import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginResponse } from '../../common/modelos/loginResponse.model';
import { LoginService } from '../../servicios/auth/login.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  
  userLoginOn: boolean = false;
  userData?: LoginResponse;
  loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (loginStatus) => {
        this.userLoginOn = loginStatus;
      },
    });

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      },
    });
  }
}
