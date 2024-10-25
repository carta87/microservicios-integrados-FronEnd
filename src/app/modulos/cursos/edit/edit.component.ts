import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursoModel } from '../../../common/modelos/curso.model';
import { CursosService } from '../../../servicios/cursos/cursos.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  
  router = inject(Router);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  cursoService = inject(CursosService);
  mostrarFormulario = false;

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.getCoursoId(id);
      this.mostrarFormulario = true;
    } else {
      this.mostrarFormulario = false;
    }
  }

  fgvalidacion = this.fb.group({
    idCurso: ['', [Validators.required, Validators.max(999)]],
    numeroCurso: ['', [Validators.required, Validators.max(999)]],
    nombreCurso: ['', Validators.required],
    nombreProfesor: ['', Validators.required],
  });

  public getCoursoId(id: number) {
    this.cursoService.getCursoId(id).subscribe({
      next: (data: CursoModel) => {
        this.fgvalidacion.patchValue({
          idCurso: data.id.toString(),
          numeroCurso: data.numberCourse.toString(),
          nombreCurso: data.name,
          nombreProfesor: data.teacher,
        });
      },
    });
  }

  public edit() {
    if (this.fgvalidacion.valid) {
      const cursoData: CursoModel = {
        id: Number(this.fgvalidacion.value.idCurso),
        numberCourse: Number(this.fgvalidacion.value.numeroCurso),
        name: this.fgvalidacion.value.nombreCurso ?? '',
        teacher: this.fgvalidacion.value.nombreProfesor
          ? this.fgvalidacion.value.nombreProfesor : '',
      };
      this.cursoService.updateCursos(cursoData).subscribe({
        next: () => {
          Swal.fire('Exito', 'Curso actualizado correctamente', 'success');
          this.router.navigate(['cursos/listar']);
        },
        error: (error) => {
          Swal.fire('Error', 'Error: ' + error.error.message, 'error');
        },
      });
    }
  }

  public buscar() {
    let id = Number(this.fgvalidacion.value.idCurso);
    if (isNaN(id) || id <= 0) {
      Swal.fire('Error', 'Ingrese un valor numerico correcto.', 'error');
      return;
    }
    this.cursoService.getCursoId(id).subscribe({
      next: (data: CursoModel) => {
        if (data.id == null) {
          Swal.fire('Error',
            'No encuentra informacion, valide id en la lista de cursos.', 'error');
        } else {
          this.fgvalidacion.patchValue({
            idCurso: data.id == null ? '' : data.id.toString(),
            numeroCurso: data.numberCourse.toString(),
            nombreCurso: data.name,
            nombreProfesor: data.teacher,
          });
          this.mostrarFormulario = true;
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
