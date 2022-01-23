import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/core/models/delivery';
import { ResearchTypology } from 'src/app/core/models/reserach-typology';
import { State } from 'src/app/core/models/state';
import { UpdateProjectRequest } from 'src/app/core/models/update-project-request';
import { UserApp } from 'src/app/core/models/userApp';
import { AuthService } from 'src/app/core/services/auth.service';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html'
})
export class EditProjectComponent implements OnInit {

  userListProfile!: Array<UserApp>;
  userListProfileS!: Array<UserApp>;
  deliveriesList!: Array<Delivery>;
  titleProjectModel!: String;
  selectedDirectorModel!: string;
  problemInvestigationModel!: string;
  justificationModel!: string;
  generalObjetiveModel!: string;
  dateFromModel!: string;
  dateUntilModel!: string;
  summaryModel!: string;
  projectMethologyModel!: string;
  researchTypologyModel!: number;
  selectedStateModel!: any;
  checkedList: any;
  selectedAll!: boolean;
  selectedOption: any;
  stateSolini!: Array<State>;
  specificObjetives!: string;
  createBy!: string;
  solini: number = 1;
  researchTypologys!: Array<ResearchTypology>;
  updateProjectRequest!: UpdateProjectRequest;
  projectId!: number;
  projectRequestId!: number;
  constructor(private userService: UserService, private genericListService: GenericListService,
    private projectService: ProjectService, private dialog: DialogComponent, private sharedMessage: SharedService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.getDeliveries();
    this.getResearchTypologys();
    this.getUsersDirectors();
    this.getStateSolini();
    this.findProject();
  }

  getDeliveries() {
    this.genericListService.getDeliveries().subscribe(response => {
      this.deliveriesList = response.genericList as Array<Delivery>;
    });
  }

  getResearchTypologys() {
    this.genericListService.getResearchTypologys().subscribe(response => {
      this.researchTypologys = response.genericList as Array<ResearchTypology>;
    });
  }

  getUsersDirectors() {
    this.userService.getUsersProfileDirectors().subscribe(response => {
      this.userListProfile = response.genericList as Array<UserApp>
    })
  }

  getStateSolini() {
    this.genericListService.getAllStates(this.solini, 0, 0, 0, 0).subscribe(response => {
      this.stateSolini = response.genericList as Array<State>;
    });
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.deliveriesList.length; i++) {
      if (this.deliveriesList[i].isSelected) {
        this.checkedList.push(this.deliveriesList[i]);
      }
    }
  }


  selectAll() {
    for (var i = 0; i < this.deliveriesList.length; i++) {
      this.deliveriesList[i].isSelected = this.selectedAll;
    }
    this.getCheckedItemList();
  }


  checkIfAllSelected() {
    this.getCheckedItemList();
  }

  onNgModelChange($event: any) {
    this.selectedOption = $event;

  }

  valueChangeState(event: any) {
    event.target.value = this.selectedStateModel;
  }

  valueChangeResearch(event: any) {
    event.target.value = this.researchTypologyModel;
  }

  valueChangeDirector(event: any) {
    event.target.value = this.selectedDirectorModel;
  }

  editProject() {
    this.projectService.createProject(this.updateProjectRequest).subscribe({
      next: (response: any) => {
        this.sharedMessage.msgInfo(response.message);
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

  findProject() {
    this.projectId=83;
    this.projectService.findProjectById(this.projectId).subscribe({
      next: (response: any) => {
        this.dateFromModel = response.project.dateFrom;
        this.dateUntilModel = response.project.dateUntil;
        this.generalObjetiveModel = response.project.generalObjetive;
        this.justificationModel = response.project.justification;
        this.projectMethologyModel = response.project.projectMethology;
        this.researchTypologyModel = response.project.projectResearchTypologyId;
        this.summaryModel = response.project.projectSummary;
        this.titleProjectModel = response.project.projectTitle;
        this.specificObjetives = response.project.specificObjetive;
        this.selectedDirectorModel = response.project.projectDirector;
        this.problemInvestigationModel = response.project.investigationProblem;
        this.selectedStateModel = response.project.state.stateId;
        this.checkedList = response.projectDeliveries as Array<Delivery>
        console.log(this.checkedList);
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
