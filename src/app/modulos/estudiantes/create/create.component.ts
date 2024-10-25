import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursoModel } from '../../../common/modelos/curso.model';
import { EstudianteModel } from '../../../common/modelos/estudiante.model';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { EstudiantesService } from '../../../servicios/estudiantes/estudiantes.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {

  router = inject(Router);
  fb = inject(FormBuilder);
  listaCourse: CursoModel[] = [];
  courseService = inject(CursosService);
  estudianteService = inject(EstudiantesService);

  fgvalidacion = this.fb.group({
    nombreEstudiante: ['', Validators.required],
    apellidosEstudiante: ['', Validators.required],
    emailEstudiante: ['', [Validators.required, Validators.email]],
    cursoIdEstudiante: ['', [Validators.required, Validators.max(999)]],
    nombreAcudiente: ['', Validators.required],
    apellidosAcudiente: ['', Validators.required],
    emailAcudiente: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    this.getCursos();
  }

  public create() {
    if (this.fgvalidacion.valid) {
      const estudianteData: EstudianteModel = {
        id: 0,
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
      this.estudianteService.saveEstudiante(estudianteData).subscribe({
        next: (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          // Nombre del archivo a descargar
          a.download = `comprobantePago_${this.fgvalidacion.value.nombreEstudiante}_${this.fgvalidacion.value.apellidosEstudiante}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          Swal.fire('Exito',
            'Estudiante registrado correctamente y puede ver el comprobante de pago.',
            'success');
          this.router.navigate(['estudiantes/listar']);
        },
        error: (error) => {
          console.error('error al crear estudiante:', error);
          Swal.fire('Error', 'No se logro registrar el estudiante.', 'error');
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
        'Por favor completa todos los campos correctamente',
        'warning');
    }
  }

  public getCursos() {
    this.courseService.getAllCursos().subscribe((data) => {
      const sortedData = data.slice().sort((a, b) => a.id - b.id); // Crear una copia y ordenar por od
      this.listaCourse = sortedData;
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
