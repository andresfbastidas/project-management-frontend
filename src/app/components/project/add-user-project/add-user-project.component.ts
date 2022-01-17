import { Component, OnInit } from '@angular/core';
import { AssociatedUserProjectRequest } from 'src/app/core/models/associatedUserProject-request';
import { UserApp } from 'src/app/core/models/userApp';
import { ProjectService } from 'src/app/core/services/project.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-add-user-project',
  templateUrl: './add-user-project.component.html'
})
export class AddUserProjectComponent implements OnInit {

  userNameModel!:string;
  selectedAll!:boolean;
  userAppList!:Array<UserApp>;
  userNameTable!:string;
  firstNameTable!:string;
  surNameTable!:string;
  profiletable!:string;
  emailTable!:string;
  selectedOption:any;
  isChecked!:boolean;
  disabled!:boolean;
  projectId!:number;
  disabledBtn!:boolean;
  constructor(private dialog:DialogComponent, private userService:UserService,
    private projectService: ProjectService,  private sharedMessage: SharedService) { }

  ngOnInit(): void {
    if(this.userNameTable==null){
      this.disabled = true;
      this.disabledBtn = false;
    }
  }
  receiveProjectId($event: any){
    this.projectId =$event;
    }
  clean(addUserProjectForm: any) {
    addUserProjectForm.resetForm();
    this.userNameTable="";
    this.firstNameTable ="";
    this.surNameTable="";
    this.profiletable="";
    this.emailTable="";
    this.disabled=true;
    this.projectId=0;
    this.disabledBtn=false;
  }


  checkIfAllSelected() {
    console.log(this.isChecked);
    if(this.isChecked){

    }
  }


  findUser(){
    this.userService.findUserName(this.userNameModel).subscribe({
      next: (response: any) =>  {
        console.log(response);
        this.userNameTable = response.userapp.userName;
        this.firstNameTable = response.userapp.firstName;
        this.surNameTable = response.userapp.surname;
        this.profiletable = response.userapp.profile.profileName;
        this.emailTable = response.userapp.email;
        this.disabled =false;
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

  associateduser(){
    let associatedRequest = new AssociatedUserProjectRequest(this.userNameTable, this.projectId);
    this.projectService.associatedUserToProject(associatedRequest).subscribe({
      next: (response: any) =>  {
        this.sharedMessage.msgInfo(response.message);
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
