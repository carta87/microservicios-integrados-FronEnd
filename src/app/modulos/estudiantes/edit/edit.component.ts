import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursoModel } from '../../../common/modelos/curso.model';
import { EstudianteModel } from '../../../common/modelos/estudiante.model';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { EstudiantesService } from '../../../servicios/estudiantes/estudiantes.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  
  router = inject(Router);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  listaCourse: CursoModel[] = [];
  courseService = inject(CursosService);
  estudianteService = inject(EstudiantesService);

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getEstudianteId(id);
    this.getCursos();
  }

  fgvalidacion = this.fb.group({
    idEstudiante: ['', Validators.required],
    nombreEstudiante: ['', Validators.required],
    apellidosEstudiante: ['', Validators.required],
    emailEstudiante: ['', [Validators.required, Validators.email]],
    cursoIdEstudiante: ['', [Validators.required, Validators.max(999)]],
    nombreAcudiente: ['', Validators.required],
    apellidosAcudiente: ['', Validators.required],
    emailAcudiente: ['', [Validators.required, Validators.email]],
  });

  public getEstudianteId(id: number) {
    this.estudianteService.getEstudianteId(id).subscribe({
      next: (data: EstudianteModel) => {
        console.log(data);
        this.fgvalidacion.patchValue({
          // Usamos patchValue para actualizar los campos
          idEstudiante: id.toString(),
          nombreEstudiante: data.name,
          apellidosEstudiante: data.lastName,
          emailEstudiante: data.email,
          cursoIdEstudiante: data.courseNumber.toString(),
          nombreAcudiente: data.attendant?.name || 'N/A',
          apellidosAcudiente: data.attendant?.lastName || 'N/A',
          emailAcudiente: data.attendant?.email || 'N/A',
        });
      },
      error: (err) => {
        console.error('Error al obtener el estudiante:', err);
        Swal.fire('Error', 'No se pudo cargar el estudiante.', 'error');
      },
    });
  }

  public edit() {
    if (this.fgvalidacion.valid) {
      const estudianteData: EstudianteModel = {
        id: Number(this.fgvalidacion.value.idEstudiante),
        name: this.fgvalidacion.value.nombreEstudiante ?? '',
        lastName: this.fgvalidacion.value.apellidosEstudiante ?? '',
        email: this.fgvalidacion.value.emailEstudiante ?? '',
        courseNumber: Number(this.fgvalidacion.value.cursoIdEstudiante),
        attendant: {
          name: this.fgvalidacion.value.nombreAcudiente ?? '',
          lastName: this.fgvalidacion.value.apellidosAcudiente ?? '',
          email: this.fgvalidacion.value.emailAcudiente ?? '',
        },
      };
      this.estudianteService.updateEstudiante(estudianteData).subscribe({
        next: () => {
          Swal.fire('Exito', 'Estudiante Actualizado Correctamente', 'success');
          this.router.navigate(['estudiantes/listar']);
        },
        error: (error) => {
          console.error('error al actualizar estudiante:', error);
          Swal.fire('Error', 'No se pudo actualizar el estudiante', 'error');
        },
      });
    } else {
      // Resaltar campos inválidos
      Object.keys(this.fgvalidacion.controls).forEach((controlName) => {
        const control = this.fgvalidacion.get(controlName);
        if (control?.invalid) {
          control.markAsDirty(); // Marca el control como "sucio" para mostrar el error
        }
      });
      Swal.fire('Advertencia',
        'Por favor completa todos los campos correctamente', 'warning');
    }
  }

  public getCursos() {
    this.courseService.getAllCursos().subscribe((data) => {
      const sortedData = data.slice().sort((a, b) => a.id - b.id); // Crear una copia y ordenar por id
      this.listaCourse = [...sortedData];
    });
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
}
