import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from 'src/app/core/models/activity';
import { ActivityRequest } from 'src/app/core/models/activity-request';
import { StateActivity } from 'src/app/core/models/state-activity';
import { UserApp } from 'src/app/core/models/userApp';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html'
})
export class CreateActivityComponent implements OnInit {

  dateFromModel!:Date;
  dateUntilModel!:Date;
  activityRequest!:ActivityRequest;
  activityNameModel!:string;
  assignedUserModel!:string;
  projectId!:any;
  selectedStateModel!:number;
  listAssignedUsers!:Array<UserApp>;
  listStatesActivities!:Array<StateActivity>;
  createActivityForm!:NgForm;
  constructor(private activityService:ActivityService, private dialog:DialogComponent,
    private sharedMessage:SharedService, private projectService:ProjectService,
    private shareData:ShareDataService, private router:Router) { }

  ngOnInit(): void {
    this.getData();
    if(this.projectId != null){
      this.getListUsersByProject(this.projectId);
    }
    this.getListStatesActivities();
  }

  getData():any {
    this.shareData.data.subscribe(response => {
      this.projectId = response;
    });
    console.log(this.projectId);
  }

  clean(createActivityForm: any) {
    createActivityForm.resetForm();
  }
  valueChangeUserAssigned(event: any) {
    event.target.value = this.assignedUserModel;
  }

  valueChangeStateActivity(event: any) {
    event.target.value = this.selectedStateModel;
  }

  getListUsersByProject(projectId:number){
    this.projectService.getListUsersByProject(projectId).subscribe(response => {
      this.listAssignedUsers = response.listUsers as Array<UserApp>;
    });
  }

  getListStatesActivities(){
    this.activityService.getListStatesActivities().subscribe(response => {
      this.listStatesActivities = response.genericList as Array<StateActivity>;
    });
  }


  createActivity(createActivityForm: any){
    let stateActivity = new StateActivity(this.selectedStateModel);
   let activity = new Activity(this.activityNameModel,this.dateFromModel,this.dateUntilModel, 
    this.assignedUserModel, stateActivity);
    this.activityRequest = new ActivityRequest(activity, this.projectId);
    this.activityService.createActivity(this.activityRequest).subscribe({
      next: (response: any) =>  {
        this.sharedMessage.msgInfo(response.message);
        this.clean(createActivityForm);
      },
      error: (err) => {
        if(err.status == 500){
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
