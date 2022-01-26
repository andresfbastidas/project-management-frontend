import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/core/models/activity';
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
  selectedProduct: any;
  rowClicked!: any;
  constructor( private dialog:DialogComponent, private activityService:ActivityService,
    private shareData:ShareDataService, private router:Router, private shareMessage:SharedService) { }

  ngOnInit(): void {
    this.getData();
    if(this.projectId != null){
      this.getListActivitiesByProject(this.projectId);
    }
  }

  getData():any {
    this.shareData.data.subscribe(response => {
      this.projectId = response;
    });
  }

  RowSelected(u: any) {
    this.selectedProduct = u;
  }

  getComments(activityid:any){
    this.sendData(activityid);
  }

  sendData(data: any) {
    this.shareData.sendData(data);
    this.router.navigate(['/create-comment']);
  }

  clean(projectListForm: any) {
    projectListForm.resetForm();
    this.rowClicked = null;
  }
  changeTableRowColor(idx: any) {
    if (this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }

  createActivity(){
    this.router.navigate(['/create-activity']);
  }

  getListActivitiesByProject(projectId:number){
    this.activityService.getListActivitiesByProject(projectId).subscribe({
      next: (response: any) =>  {
        this.listActivities = response.listActivities as Array<Activity>;
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
