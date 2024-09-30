import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LogingRequest } from '../../../modelos/loginRequest.model';
import { LoginService } from '../../../servicios/auth/login.service';
;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginError: string = "";
  loginForm: FormGroup;
  router = inject(Router);
  loginService = inject(LoginService);


  constructor(private formBuilder: FormBuilder) {
    // Inicializa el formulario dentro del constructor
    this.loginForm = this.formBuilder.group({
      email: ['cart_albert@hotmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email(){
    return this.loginForm.controls['email'];
  }

  get password(){
    return this.loginForm.controls['password'];
  }

  login (){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LogingRequest).subscribe({
      next: (data)=>{
        console.log(data);
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
}
