import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-menubar',
  templateUrl: './menu-bar-component.html'
})
export class MenuBarComponent implements OnInit {

  items!: MenuItem[];
  constructor(public readonly authService:AuthService) { }

  ngOnInit(): void {
    this.items = [
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
