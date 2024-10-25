import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create',
    loadComponent: () =>
      import('./usuarios/create/create.component').then((c) => c.CreateComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
