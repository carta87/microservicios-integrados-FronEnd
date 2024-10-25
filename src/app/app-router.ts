import { Routes } from '@angular/router';
import { IndexComponent } from './shared/index/index.component';


export const routes: Routes = [
  {
    path:'', redirectTo:"/inicio", pathMatch:'full'
  },
  {
    path:'inicio', component: IndexComponent
  },
  {
    path:'seguridad',
    loadChildren: () => import('./modulos/seguridad/seguridad-routing.module').then(m =>m.SeguridadRoutingModule)
  },
  {
    path:'estudiantes',
    loadChildren: () => import('./modulos/estudiantes/estudiante-routing.module').then(m => m.EstudianteRoutingModule)
  },
  {
    path: 'usuarios',
    loadChildren: () =>  import('./modulos/admin/admin-routing-module').then(c => c.AdminRoutingModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./modulos/cursos/coursos-routing.module').then(c => c.CoursosRoutingModule)
  }
];
