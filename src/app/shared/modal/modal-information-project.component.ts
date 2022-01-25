import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project.service';
import { DialogComponent } from '../notification/dialog.component';

@Component({
  selector: 'app-modal-information-project',
  templateUrl: './modal-information-project.component.html'
})
export class ModalInformationProjectComponent implements OnInit {

  justificationModel!: string;
  generalObjetiveModel!: string;
  dateFromModel!: string;
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
  bsModalRef!: BsModalRef;
  constructor(private projectService:ProjectService,
    private dialog: DialogComponent) { }

  ngOnInit(): void {
    this.findProject();
  }


  findProject() {
    this.projectId=1;
    this.projectService.findProjectById(this.projectId).subscribe({
      next: (response: any) => {
        this.dateFromModel = response.projectsListDTO.dateFrom;
        this.dateUntilModel = response.projectsListDTO.dateUntil;
        this.generalObjetiveModel = response.projectsListDTO.generalObjetive;
        this.justificationModel = response.projectsListDTO.justification;
        this.projectMethologyModel = response.projectsListDTO.projectMethology;
        this.researchTypologyModel = response.projectsListDTO.projectResearchTypologyId;
        this.summaryModel = response.projectsListDTO.projectSummary;
        this.titleProjectModel = response.projectsListDTO.projectTitle;
        this.specificObjetives = response.projectsListDTO.specificObjetive;
        this.projectDirector = response.projectsListDTO.projectDirector;
        this.researchProblemModel = response.project.researchProblem;
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
