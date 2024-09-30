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
  }

];
