import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delivery } from 'src/app/core/models/delivery';
import { Project } from 'src/app/core/models/project';
import { ResearchTypology } from 'src/app/core/models/reserach-typology';
import { State } from 'src/app/core/models/state';
import { UpdateProjectRequest } from 'src/app/core/models/update-project-request';
import { UserApp } from 'src/app/core/models/userApp';
import { AuthService } from 'src/app/core/services/auth.service';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
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
  datePipe = new DatePipe('en-US');
  userApp = {} as any;
  dataReceive = {} as any;
  constructor(private userService: UserService, private genericListService: GenericListService,
    private projectService: ProjectService, private dialog: DialogComponent, private sharedMessage: SharedService,
    public authService: AuthService, private shareData: ShareDataService, private router:Router ) { }

  ngOnInit(): void {
    this.getData();
    this.getDeliveries();
    this.getResearchTypologys();
    this.getUsersDirectors();
    this.getStateSolini();
    this.findProject();
  }

  getData():any {
    this.shareData.data.subscribe(response => {
      this.dataReceive = response;
      this.projectId = this.dataReceive.projectId;
      this.projectRequestId = this.dataReceive.projectRequestId;
    });
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
    const formatDateFrom = this.datePipe.transform(this.dateFromModel, "dd-MM-yyyy");
    const formatDateUntil = this.datePipe.transform(this.dateUntilModel, "dd-MM-yyyy");
    this.createBy = this.authService.getUser();
    let project = new Project(this.titleProjectModel, formatDateFrom,
      formatDateUntil, this.generalObjetiveModel, this.justificationModel,
      this.projectMethologyModel, this.researchTypologyModel, this.summaryModel,
      this.specificObjetives, this.selectedDirectorModel, this.createBy, this.problemInvestigationModel);
    let state = new State(this.selectedStateModel);
    let userapp = new UserApp("", "", "", "", "", "", this.authService.getUser(), this.userApp.profile);
    this.updateProjectRequest = new UpdateProjectRequest(project, state, this.checkedList, userapp, this.projectId, this.projectRequestId);
    this.projectService.updateProject(this.updateProjectRequest).subscribe({
      next: (response: any) => {
        this.sharedMessage.msgInfo(response.message);
        this.router.navigate(['/approval-projects']);
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
