import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../../../servicios/usuarios/usuarios.service';
import { RegisterRequest } from '../../../../common/modelos/registerRequest.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../../servicios/auth/login.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  
  loginError: string = '';
  router = inject(Router);
  fb = inject(FormBuilder);
  loginService = inject(LoginService);
  usuarioService = inject(UsuariosService);

  fgvalidacion = this.fb.group({
    firsName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    country: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  public register(): void {
    if (this.fgvalidacion.valid) {
      if (!this.passwordMatchValidator()) {
        this.loginError = 'No coinciden las contraseñas';
      } else {
        this.usuarioService
          .crearUsuario(this.fgvalidacion.value as RegisterRequest)
          .subscribe({
            next: (data) => {
              Swal.fire('¡creado Correctamente!', '', 'success');
              this.router.navigate(['/inicio']);
              this.login();
            },
            error: (error) => {
              this.loginError = error;
              console.log(error);
            },
          });
      }
    } else {
      // Resaltar campos inválidos
      Object.keys(this.fgvalidacion.controls).forEach((controlName) => {
        const control = this.fgvalidacion.get(controlName);
        if (control?.invalid) {
          control.markAsDirty(); // Marca el control como "sucio" para mostrar el error
        }
      });
      Swal.fire('Advertencia', 'Por favor completa todos los campos correctamente.', 'warning');
    }
  }

  public login() {
    if (this.fgvalidacion.valid) {
      this.loginService
        .login(this.fgvalidacion.value as RegisterRequest)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.error(error);
            this.loginError = error;
          },
          complete: () => {
            console.info('login completo');
            this.router.navigateByUrl('/inicio');
            this.fgvalidacion.reset();
          },
        });
    } else {
      console.log('error al ingresar los datos');
    }
  }

  public getErrorMessage(controlName: string): string {
    const control = this.fgvalidacion.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    } else if (control?.hasError('email')) {
      return 'El formato del correo electrónico no es válido';
    } else if (control?.hasError('max')) {
      return 'la cantidad permitida es maximo 3 digito';
    }
    return '';
  }

  private passwordMatchValidator(): boolean {
    const password = this.fgvalidacion.get('password')?.value;
    const confirmPassword = this.fgvalidacion.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
