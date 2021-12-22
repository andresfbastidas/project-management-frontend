import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Delivery } from 'src/app/core/models/delivery';
import { Project } from 'src/app/core/models/project';
import { ProjectRequest } from 'src/app/core/models/project-request';
import { ResearchTypology } from 'src/app/core/models/reserach-typology';
import { State } from 'src/app/core/models/state';
import { UserApp } from 'src/app/core/models/userApp';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';

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
  constructor(private userService:UserService, private genericListService:GenericListService,
    private projectService:ProjectService) { }

  ngOnInit(): void {
     this.getDeliveries();
     this.getResearchTypologys();
     this.getUsersDirectors();
     this.getStates();
  }

  getDeliveries(){
    this.genericListService.getDeliveries().subscribe(response => {
      this.deliveriesList = response.genericList as Array<Delivery>;
    });
  }

  getResearchTypologys(){
    this.genericListService.getResearchTypologys().subscribe(response => {
      this.researchTypologys = response.genericList as Array<ResearchTypology>;
       console.log(this.researchTypologys);
    });
  }

  getUsersDirectors(){
     this.userService.getUsersProfileDirectors().subscribe(response =>{
       this.userListProfile = response.genericList as Array<UserApp>
       console.log(this.userListProfile);
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
        this.idDelivery =this.deliveriesList[i].deliveryId;
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
     this.projectRequest = new ProjectRequest(project, state, this.deliveriesList)
  }

}
