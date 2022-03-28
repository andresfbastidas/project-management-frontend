import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/core/models/activity';
import { StateActivity } from 'src/app/core/models/state-activity';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html'
})
export class ListActivitiesComponent implements OnInit {

  listActivities!:Array<Activity>;
  projectId!:any;
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  currentIndex = -1;
  progressState: number =1;
  createState: number =2;
  finishedState: number =3;
  selectedState!: any;
  listStatesActivities!:Array<StateActivity>;
  constructor( private dialog:DialogComponent, private activityService:ActivityService,
    private shareData:ShareDataService, private router:Router, private shareMessage:SharedService) { }

  ngOnInit(): void {
    this.getData();
    this.getListStatesActivities();
    if(this.projectId != null || this.projectId!=0){
      this.getListActivitiesByProject(this.projectId, this.progressState, this.createState, this.finishedState);
    }
  }

  getData():any {
    this.shareData.data.subscribe(response => {
      this.projectId = response;
    });
  }

  back(){
    this.router.navigate(['/list-project-user']);
  }
  getComments(activityid:any){
    this.sendData(activityid);
  }

  sendData(data: any) {
    this.shareData.sendDataComment(data);
    this.router.navigate(['/list-comments']);
  }

  valueChangeStateRequest(event: any): void {
    this.progressState = event.target.value;
    this.createState =  event.target.value;
    this.finishedState =  event.target.value;
    if(event.target.value==1){
      this.createState = 0;
      this.finishedState = 0;
      this.getListActivitiesByProject(this.projectId, this.progressState, this.createState,  this.finishedState);
    }else if(event.target.value==2){
      this.progressState = 0;
      this.finishedState = 0;
      this.getListActivitiesByProject(this.projectId,  this.progressState , this.createState,  this.finishedState);
    }else if(event.target.value==3){
      this.progressState = 0;
      this.createState = 0;
      this.getListActivitiesByProject(this.projectId,  this.progressState , this.createState,  this.finishedState);
    }
    
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getListActivitiesByProject(this.projectId, this.progressState, this.createState, this.finishedState);
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.getListActivitiesByProject(this.projectId,  this.progressState, this.createState, this.finishedState);
  }

  clean(activityListForm: any) {
    activityListForm.resetForm();
    this.progressState = 1;
    this.createState = 2;
    this.finishedState = 3;
    this.getListStatesActivities();
    this.selectedState = null;
    this.getListActivitiesByProject(this.projectId,  this.progressState, this.createState, this.finishedState);
  }

  createActivity(){
    this.router.navigate(['/create-activity']);
  }

  getListStatesActivities(){
    this.activityService.getListStatesActivities().subscribe(response => {
      this.listStatesActivities = response.genericList as Array<StateActivity>;
    });
  }

  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params[`numPage`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  getRequestParamsDelete(activityId: number): any {
    let params: any = {};

    if (activityId) {
      params[`activityId`] = activityId;
    }
    return params;
  }

  deleteActivity(activityId:number){
   const params = this.getRequestParamsDelete(activityId);
   this.activityService.deleteActivity(params).subscribe({
    next: (response: any) =>  {
      this.shareMessage.msgInfo(response.message);
      this.getListActivitiesByProject(this.projectId,  this.progressState, this.createState, this.finishedState);
    },
    error: (err) => {
      this.dialog.show({
        title: "Error",
        content: this.dialog.formatError(err),
        type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
      });
    }
  });
  }

  updateActivity(activityId:number){
    this.activityService.updateActivity(activityId).subscribe({
      next: (response: any) =>  {
        this.shareMessage.msgInfo(response.message);
        this.getListActivitiesByProject(this.projectId,  this.progressState, this.createState, this.finishedState);
      },
      error: (err) => {
        this.dialog.show({
          title: "Error",
          content: this.dialog.formatError(err),
          type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
        });
      }
    });
  }


  getListActivitiesByProject(projectId:number, progressState:number, createState:number, finishedState:number){
    progressState = this.progressState;
    createState = this.createState;
    finishedState = this.finishedState;
    const params = this.getRequestParams(this.page, this.pageSize);
    this.activityService.getListActivitiesByProject(projectId, progressState,createState, finishedState, params).subscribe({
      next: (response: any) =>  {
        this.listActivities = response.listActivities as Array<Activity>;
        this.count = response.totalElements;
      },
      error: (err) => {
        this.dialog.show({
          title: "Error",
          content: this.dialog.formatError(err),
          type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
        });
      }
    });
}

}
