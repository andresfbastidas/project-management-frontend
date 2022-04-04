import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { DialogComponent } from '../notification/dialog.component';

@Component({
  selector: 'app-modal-information-project',
  templateUrl: './modal-information-project.component.html'
})
export class ModalInformationProjectComponent implements OnInit {

  justificationModel!: string;
  generalObjetiveModel!: string;
  dateFromModel!: Date;
  dateUntilModel!: string;
  summaryModel!: string;
  projectMethologyModel!: string;
  researchTypologyModel!: string;
  specificObjetives!: string;
  titleProjectModel!: String;
  researchProblemModel!: string;
  projectDirector!:string;
  stateName!:string;
  deliverys!:string;
  createBy!:string;
  projectId!:number;
  constructor(private projectService:ProjectService,
    private dialog: DialogComponent, private shareData: ShareDataService, private router:Router ) { }

  ngOnInit(): void {
    this.getData();
    this.findProject();
  }

  back(){
    this.router.navigate(['/approval-projects']);
  }

  getData():any {
    this.shareData.data.subscribe(response => {
      this.projectId = response;
    });
  }
  findProject() {
    this.projectService.findProjectDTO(this.projectId).subscribe({
      next: (response: any) => {
        this.dateFromModel = response.projectsListDTO.dateFrom;
        this.dateUntilModel = response.projectsListDTO.dateUntil;
        this.generalObjetiveModel = response.projectsListDTO.generalObjetive;
        this.justificationModel = response.projectsListDTO.justification;
        this.projectMethologyModel = response.projectsListDTO.projectMethology;
        this.researchTypologyModel = response.projectsListDTO.typologyDescription;
        this.summaryModel = response.projectsListDTO.projectSummary;
        this.titleProjectModel = response.projectsListDTO.projectTitle;
        this.specificObjetives = response.projectsListDTO.specificObjetive;
        this.projectDirector = response.projectsListDTO.projectDirector;
        this.researchProblemModel = response.projectsListDTO.researchProblem;
        this.stateName = response.projectsListDTO.stateName;
        this.deliverys = response.projectsListDTO.deliverys;
        this.createBy = response.projectsListDTO.createBy;
      },
      error: (err) => {
        if (err.status == 500) {
          this.dialog.show({
            title: "Error",
            content: this.dialog.formatError(err),
            type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
          });
        }
      }
    });
  }

}
