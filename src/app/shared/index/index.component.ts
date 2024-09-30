import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { LoginService } from '../../servicios/auth/login.service';
import { User } from '../../modelos/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit, OnDestroy{
  userLoginOn: boolean =false;
  userData? : User;
  loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next: (loginStatus) =>{
          this.userLoginOn = loginStatus;
        }
      }
    )

    this.loginService.currentUserData.subscribe(
      {
        next: (userData)=>{
          this.userData = userData;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }
}
