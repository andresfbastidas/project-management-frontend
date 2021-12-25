import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-list-project-user',
  templateUrl: './list-project-user.component.html'
})
export class ListProjectUserComponent implements OnInit {

  projectList!:Array<Project>;
  selectedAll!:boolean;
  checkedList: any;
  selectedOption:any;
  constructor(private authService:AuthService, private projectService:ProjectService,
    private dialog:DialogComponent, private sharedMessage:SharedService) { }

  ngOnInit(): void {
    this.getListProjectsByUserName(this.authService.getUser());
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].isSelected) {
        this.checkedList.push(this.projectList[i]);
      }
    }
  }


  selectAll() {
    for (var i = 0; i < this.projectList.length; i++) {
      this.projectList[i].isSelected = this.selectedAll;
    }
    this.getCheckedItemList();
  }


  checkIfAllSelected() {
    this.selectedAll = this.projectList.every(function(transactions:any) {
        return transactions.isSelected;
      })
      this.getCheckedItemList();
  }

  onNgModelChange($event:any){
    this.selectedOption=$event;

  }

  getListProjectsByUserName(userName:string){
      this.projectService.getListProjectsByUserName(userName).subscribe({
        next: (response: any) =>  {
          this.projectList = response.projectList as Array<Project>;
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
