import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LogingRequest } from '../../../common/modelos/loginRequest.model';
import { LoginService } from '../../../servicios/auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginError: string = "";
  loginForm: FormGroup;
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  loginService = inject(LoginService);

  constructor() {
    // Inicializa el formulario dentro del constructor
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required]
      //email: ['', [Validators.required, Validators.email]],
    });
  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

  get username(){
    return this.loginForm.controls['username'];
  }

  public login (){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LogingRequest).subscribe({
      next: (data)=>{
        console.log("info de login token: " + data.token);
      },
      error:(error) =>{
        console.error(error);
        this.loginError = error;
      },
      complete: ()=>{
        console.info("login completo");
        this.router.navigateByUrl('/inicio');
        this.loginForm.reset();
      }
      })
    }else{
      console.log("error al ingresar los datos")
    }
  }

  public logout(){
    this.loginService.logout();
  }
}
