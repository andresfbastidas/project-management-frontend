import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Delivery } from 'src/app/core/models/delivery';
import { Project } from 'src/app/core/models/project';
import { CreateProjectRequest } from 'src/app/core/models/create-project-request';
import { ResearchTypology } from 'src/app/core/models/reserach-typology';
import { State } from 'src/app/core/models/state';
import { UserApp } from 'src/app/core/models/userApp';
import { AuthService } from 'src/app/core/services/auth.service';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html'
})
export class CreateprojectComponent implements OnInit {

  selectedOption: any;
  userApp = {} as any;
  deliveriesList!: Array<Delivery>;
  researchTypologys!: Array<ResearchTypology>;
  userListProfile!: Array<UserApp>;
  userListProfileS!: Array<UserApp>;
  statesList!: Array<State>;
  stateSolini!: Array<State>;
  selectedAll!: boolean;
  checkedList: any;
  solini: number = 1;
  decline: number = 2;
  finished: number = 3;
  progress: number = 4;
  avalaible: number = 5;
  idDelivery!: number;
  titleProjectModel!: String;
  selectedDirectorModel!: string;
  researchProblemModel!: string;
  justificationModel!: string;
  generalObjetiveModel!: string;
  dateFromModel!: Date;
  dateUntilModel!: Date;
  summaryModel!: string;
  projectMethologyModel!: string;
  researchTypologyModel!: number;
  selectedStateModel!: any;
  createProjectRequest!: CreateProjectRequest;
  state!: State;
  specificObjetives!: string;
  createBy!: string;
  createProjectForm!: NgForm;
  datePipe = new DatePipe('en-US');
  constructor(private userService: UserService, private genericListService: GenericListService,
    private projectService: ProjectService, private dialog: DialogComponent, private sharedMessage: SharedService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.getDeliveries();
    this.getResearchTypologys();
    this.getUsersDirectors();
    if (this.authService.getRol() == 'DIRECTOR') {
      this.getStatesProgressAvalaible();
    } else {
      this.getStateSolini();
    }
    this.checkedList = 0;
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
  getStatesProgressAvalaible() {
    this.genericListService.getAllStates(0, 0, 0, this.progress, this.avalaible).subscribe(response => {
      this.statesList = response.genericList as Array<State>;
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
    this.selectedAll = this.deliveriesList.every(function (transactions: any) {
      return transactions.isSelected;
    })
    this.getCheckedItemList();
  }

  onNgModelChange($event: any) {
    this.selectedOption = $event;

  }

  clean(createProjectForm: any) {
    createProjectForm.resetForm();
    this.checkedList = 0;
  }
  valueChangeDirector(event: any) {
    event.target.value = this.selectedDirectorModel;
  }

  valueChangeState(event: any) {
    event.target.value = this.selectedStateModel;
  }

  valueChangeResearch(event: any) {
    event.target.value = this.researchTypologyModel;
  }

  createProject(createProjectForm: any) {
    const formatDateFrom = this.datePipe.transform(this.dateFromModel, "dd-MM-yyyy");
    const formatDateUntil = this.datePipe.transform(this.dateUntilModel, "dd-MM-yyyy");
    this.createBy = this.authService.getUser();
    let project = new Project(this.titleProjectModel, formatDateFrom,
      formatDateUntil, this.generalObjetiveModel, this.justificationModel,
      this.projectMethologyModel, this.researchTypologyModel, this.summaryModel,
      this.specificObjetives, this.selectedDirectorModel, this.createBy, this.researchProblemModel);
    let state = new State(this.selectedStateModel);
    let userapp = new UserApp("", "", "", "", "", "", this.authService.getUser(), this.userApp.profile);
    this.createProjectRequest = new CreateProjectRequest(project, state, this.checkedList, userapp);
    this.projectService.createProject(this.createProjectRequest).subscribe({
      next: (response: any) => {
        this.sharedMessage.msgInfo(response.message);
        this.clean(createProjectForm);
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
