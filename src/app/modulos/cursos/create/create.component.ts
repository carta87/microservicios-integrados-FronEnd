import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursoModel } from '../../../common/modelos/curso.model';
import { CursosService } from '../../../servicios/cursos/cursos.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  
  router = inject(Router);
  fb = inject(FormBuilder);
  cursoService = inject(CursosService);

  fgvalidacion = this.fb.group({
    numeroCurso: ['', [Validators.required, Validators.max(999)]],
    nombreCurso: ['', Validators.required],
    nombreProfesor: ['', Validators.required],
  });

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

  public create() {
    if (this.fgvalidacion.valid) {
      const cursoData: CursoModel = {
        id: 0,
        numberCourse: Number(this.fgvalidacion.value.numeroCurso),
        name: this.fgvalidacion.value.nombreCurso ?? '',
        teacher: this.fgvalidacion.value.nombreProfesor
          ? this.fgvalidacion.value.nombreProfesor
          : '',
      };
      this.cursoService.saveCursos(cursoData).subscribe({
        next: () => {
          Swal.fire('Exito', 'Curso creado correctamente', 'success');
          this.router.navigate(['cursos/listar']);
        },
        error: (error) => {
          Swal.fire(
            'Error',
            'No se pudo crear el curso: ' + error.error.message,
            'error'
          );
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
        'Por favor completa todos los campos correctamente.', 'warning');
    }
  }
}
