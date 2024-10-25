import { Component } from '@angular/core';
import { MenuInterface } from '../../../common/modelos/menu.model';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  templateMenu: MenuInterface[] = [
    {
      texto: 'Crear curso.',
      ruta: '/cursos/crear'
    },
    {
      texto: 'Lista de cursos.',
      ruta: '/cursos/listar'
    },
    {
      texto: 'Editar curso por id.',
      ruta: '/cursos/editar'
    },
    {
      texto: 'Filtrar inscritos por numero de curso',
      ruta: '/cursos/filtro'
    }
  ]
}
