import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { State } from 'src/app/core/models/state';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html'
})
export class ListProjectsComponent implements OnInit {

  projectList!: Array<Project>;
  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 12];
  currentIndex = -1;
  selectedState!: any;
  stateProject:number=4;
  solini:number =1;
  decline:number=2;
  finished:number=3;
  progress:number = 4;
  avalaible:number = 5;
  statesList!:Array<State>;
  constructor(private projectService:ProjectService, private dialog:DialogComponent,
    private genericService: GenericListService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }
  getStatesProject(){
    this.genericService.getAllStates(0, this.decline, this.finished, this.progress, this.avalaible).subscribe(response => {
      this.statesList = response.genericList as Array<State>;
    });
  }

  valueChangeStateRequest(event: any): void {
    this.stateProject = event.target.value;
    this.getAllProjects();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllProjects();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllProjects();
  }


  getAllProjects() {
    this.projectService.getAllProjectsByState(this.stateProject).subscribe({
      next: (response: any) => {
        this.projectList = response.projectList as Array<Project>;
        this.count = response.totalElements;
      },
      error: (err) => {
        this.dialog.show({
          title: "Error",
          content: this.dialog.formatError(err),
          type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
        });
      }
    });
  }

}
