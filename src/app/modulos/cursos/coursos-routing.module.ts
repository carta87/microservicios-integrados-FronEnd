import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GetComponent } from './get/get.component';
import { EditComponent } from './edit/edit.component';
import { FiltroComponent } from './filtro/filtro.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'crear', component: CreateComponent },
      { path: 'editar', component: EditComponent },
      { path: 'editar/:id', component: EditComponent },
      { path: 'listar', component: GetComponent },
      { path: 'filtro', component: FiltroComponent },
    ],
  },
  {
    path: '',
    redirectTo: '/listar',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursosRoutingModule {}
