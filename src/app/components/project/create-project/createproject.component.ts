import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Delivery } from 'src/app/core/models/delivery';
import { Profile } from 'src/app/core/models/profile';
import { Project } from 'src/app/core/models/project';
import { ProjectRequest } from 'src/app/core/models/project-request';
import { ResearchTypology } from 'src/app/core/models/reserach-typology';
import { State } from 'src/app/core/models/state';
import { UserApp } from 'src/app/core/models/userApp';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html'
})
export class CreateprojectComponent implements OnInit {

  selectedOption:any;
  deliveriesList!:Array<Delivery>;
  researchTypologys!:Array<ResearchTypology>;
  userListProfile!:Array<UserApp>;
  userListProfileS!:Array<UserApp>;
  statesList!:Array<State>;
  selectedAll!:boolean;
  checkedList: any;
  idDelivery!: number;
  titleProjectModel!:String;
  selectedDirectorModel!:string;
  problemInvestigationModel!:string;
  justificationModel!:string;
  generalObjetiveModel!:string;
  dateFromModel!:Date;
  dateUntilModel!:Date;
  summaryModel!:string;
  projectMethologyModel!:string;
  researchTypologyModel!:number;
  selectedStateModel!:any;
  projectRequest!:ProjectRequest;
  state!:State;
  specificObjetives!:string;
  createProjectForm!:NgForm;
  constructor(private userService:UserService, private genericListService:GenericListService,
    private projectService:ProjectService, private dialog:DialogComponent, private sharedMessage:SharedService) { }

  ngOnInit(): void {
     this.getDeliveries();
     this.getResearchTypologys();
     this.getUsersDirectors();
     this.getStates();
     this.checkedList=0;
  }

  getDeliveries(){
    this.genericListService.getDeliveries().subscribe(response => {
      this.deliveriesList = response.genericList as Array<Delivery>;
    });
  }

  getResearchTypologys(){
    this.genericListService.getResearchTypologys().subscribe(response => {
      this.researchTypologys = response.genericList as Array<ResearchTypology>;
    });
  }

  getUsersDirectors(){
     this.userService.getUsersProfileDirectors().subscribe(response =>{
       this.userListProfile = response.genericList as Array<UserApp>
     })
  }

  getStates(){
    this.genericListService.getStates().subscribe(response => {
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
    this.selectedAll = this.deliveriesList.every(function(transactions:any) {
        return transactions.isSelected;
      })
      this.getCheckedItemList();
  }

  onNgModelChange($event:any){
    this.selectedOption=$event;

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

  createProject(){
    let project = new Project(this.titleProjectModel, this.dateFromModel, 
      this.dateUntilModel, this.generalObjetiveModel,this.justificationModel, 
      this.projectMethologyModel, this.researchTypologyModel, this.summaryModel,
      this.specificObjetives);
      let state = new State(this.selectedStateModel);
      let profile = new Profile();
      let userapp = new UserApp("","","","","","",this.selectedDirectorModel,profile);
     this.projectRequest = new ProjectRequest(project, state, this.checkedList, userapp);
     this.projectService.createProject(this.projectRequest).subscribe({
      next: (response: any) =>  {
        this.sharedMessage.msgInfo(response.message);
        this.clean(this.createProjectForm);
      },
      error: (err) => {
        if(err.status == 500){
          this.clean(this.createProjectForm);
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
