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

  deliveriesList!:Array<Delivery>;
  researchTypologys!:Array<ResearchTypology>;
  userListProfile!:Array<UserApp>;
  statesList!:Array<State>;
  selectedAll!:boolean;
  checkedList: any;
  idDelivery!: number;
  titleProjectModel!:String;
  selectedDirectorModel!:any;
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
        this.idDelivery =this.deliveriesList[i].deliveryId;
      }
    }
  }

  checkIfAllSelected(f:NgForm):void {
    this.selectedAll = Object.keys(f.controls).every(element => {
        return (element!=='chk-all')?f.controls[element].value === true:true;
    });
    this.getCheckedItemList();
  }//checkIfAllSelected

  toggleAll(f:NgForm):void{
    Object.keys(f.controls).forEach(element => {
      if(element!=='chk-all'){
        f.controls[element].setValue(this.selectedAll);
      }
    });
  }//toggleAll

  valueChange(event: any) {
    event.target.value.description = this.selectedDirectorModel;
  }

  createProject(){
    let project = new Project(this.titleProjectModel, this.dateFromModel, 
      this.dateUntilModel, this.generalObjetiveModel,this.justificationModel, 
      this.projectMethologyModel, this.researchTypologyModel, this.summaryModel,
      this.specificObjetives)
     this.projectRequest = new ProjectRequest(project, this.selectedStateModel, this.deliveriesList)
  }

}
