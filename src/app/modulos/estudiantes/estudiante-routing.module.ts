import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  {
    path: 'crear',
    loadComponent: () => import('./create/create.component').then(c => c.CreateComponent)
  },
  {
    path: 'listar',
    loadComponent: () => import('./get/get.component').then(c => c.GetComponent)
  },
  {
    path: 'editar/:id',
    loadComponent:()=> import('./edit/edit.component').then(c => c.EditComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule{}
