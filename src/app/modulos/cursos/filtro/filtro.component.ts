import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { CursoModel } from '../../../common/modelos/curso.model';
import { EstudianteModel } from '../../../common/modelos/estudiante.model';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css',
})
export class FiltroComponent {

  fb = inject(FormBuilder);
  mostrarFormulario = false;
  cursoService = inject(CursosService);
  listaEstudiantes: EstudianteModel[] = [];

  fgvalidacion = this.fb.group({
    numeroCurso: ['', [Validators.required, Validators.max(999)]],
    nombreCurso: ['', Validators.required],
    nombreProfesor: ['', Validators.required],
  });

  public buscar() {
    let id = Number(this.fgvalidacion.value.numeroCurso);
    if (isNaN(id) || id <= 0) {
      Swal.fire('Error', 'Ingrese un valor numerico correcto.', 'error');
      return;
    }
    this.cursoService.getCursoAllEstudiantes(id).subscribe({
      next: (data: CursoModel) => {
        debugger
        if (data.teacher == '') {
          Swal.fire('Error',
            'No encuentra informacion, valide numero de curso.', 'error');
        } else {
          this.mostrarFormulario = true;
          this.fgvalidacion.patchValue({
            nombreCurso: data.name,
            nombreProfesor: data.teacher,
          });
          this.listaEstudiantes = data.studentDTOList || [];
        }
      },
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
