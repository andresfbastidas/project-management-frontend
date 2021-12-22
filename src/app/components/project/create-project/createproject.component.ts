import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/core/models/delivery';
import { ResearchTypology } from 'src/app/core/models/reserach-typology';
import { State } from 'src/app/core/models/state';
import { UserApp } from 'src/app/core/models/userApp';
import { GenericListService } from 'src/app/core/services/generic-list.service';
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
  constructor(private userService:UserService, private genericListService:GenericListService) { }

  ngOnInit(): void {
     this.getDeliveries();
     this.getResearchTypologys();
     this.getUsersDirectors();
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

}
