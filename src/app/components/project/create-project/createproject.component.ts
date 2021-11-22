import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html'
})
export class CreateprojectComponent implements OnInit {

  directorsList!: Array<String>;
  constructor() { }

  myObjArray = [
    {id: 1, name: "Rocio Segovia" },
    {id: 2, name: "Ivan Cabezas" },
    {id: 3, name: "Jose Luis Jurado" }
  ];

  myObjArray2 = [
    {id: 1, name: "Trabajo de grado" },
    {id: 2, name: "Tesis de doctorado" },
    {id: 3, name: "Tesis de maestria" }
  ];

  myObjArray3 = [
    {id: 1, name: "EN REVISIÓN" },
    {id: 2, name: "EN PROGRESO" },
    {id: 3, name: "CERRADO" }
  ];

  ngOnInit(): void {
    this.getDirectorList();
  }

  getDirectorList(){
    this.directorsList;
  }

}
