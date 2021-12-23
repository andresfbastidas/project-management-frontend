import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-menubar',
  templateUrl: './menu-bar-component.html'
})
export class MenuBarComponent implements OnInit {

  menuDirector!: MenuItem[];
  menuEstudianteProfesor!: MenuItem[];
  constructor(public readonly authService:AuthService) { }

  ngOnInit(): void {
   this.menuDirector = [
      {
        label: 'Gestión de Proyectos',
        items: [
            {
              label: 'Crear Proyecto', 
              icon: 'pi pi-fw pi-file',
              routerLink: ['create-project']
            }
        ]
      }
    ];

    this.menuEstudianteProfesor = [
      {
        label: 'Gestión de Proyectos',
        items: [
            {
              label: 'Crear Proyecto', 
              icon: 'pi pi-fw pi-file',
              routerLink: ['create-project']
            }
        ]
      }
    ];
  }

}
