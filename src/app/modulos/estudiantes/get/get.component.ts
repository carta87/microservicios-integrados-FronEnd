import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import Swal from 'sweetalert2';
import { EstudianteModel } from '../../../common/modelos/estudiante.model';
import { LoginService } from '../../../servicios/auth/login.service';
import { EstudiantesService } from '../../../servicios/estudiantes/estudiantes.service';

@Component({
  selector: 'app-get',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './get.component.html',
  styleUrl: './get.component.css',
})
export class GetComponent implements OnInit {
  
  loginService = inject(LoginService);
  estudianteService = inject(EstudiantesService);
  listaEstudiantes: EstudianteModel[] = [];
  userLoginOn: boolean = false;
  page: number = 1;

  ngOnInit(): void {
    this.getAllEstudaintes();
    this.loginService.userLoginOn.subscribe({
      next: (useloginStatus) => {
        this.userLoginOn = useloginStatus;
      },
    });
  }

  public getAllEstudaintes() {
    this.estudianteService.getAllEstudiantes().subscribe((data) => {
      this.listaEstudiantes = data;
      console.log(data);
    });
  }

  public deleteEstudiante(id: number) {
    Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: 'red',
      showCancelButton: true, // Agrega un botón de cancelar
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteService.deleteEstudiante(id).subscribe({
          next: () => {
            // Actualizar la lista localmente
            this.listaEstudiantes = this.listaEstudiantes.filter(
              (est) => est.id !== id
            );
            Swal.fire('¡Eliminado correctamente!', '', 'success');
          },
          error: (err) => {
            Swal.fire('Error al eliminar', err.message, 'error');
          },
        });
      }
    });
  }
}
