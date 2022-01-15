import { Component, OnInit } from '@angular/core';
import { UserApp } from 'src/app/core/models/userApp';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-add-user-project',
  templateUrl: './add-user-project.component.html'
})
export class AddUserProjectComponent implements OnInit {

  userNameModel!:string;
  checkedList: any;
  selectedAll!:boolean;
  userAppList!:Array<UserApp>;
  userNameTable!:string;
  firstNameTable!:string;
  surNameTable!:string;
  profiletable!:string;
  selectedOption:any;
  constructor(private dialog:DialogComponent, private userService:UserService) { }

  ngOnInit(): void {
  }

  clean(addUserProjectForm: any) {
    addUserProjectForm.resetForm();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.userAppList.length; i++) {
      if (this.userAppList[i].isSelected) {
        this.checkedList.push(this.userAppList[i]);
      }
    }
  }


  checkIfAllSelected() {
    this.selectedAll = this.userAppList.every(function(transactions:any) {
        return transactions.isSelected;
      })
      this.getCheckedItemList();
      console.log(this.checkedList);
  }

  onNgModelChange($event:any){
    this.selectedOption=$event;
    console.log(this.selectedOption);

  }

  selectAll() {
    this.getCheckedItemList();
  }

  findUser(){
    this.userService.findUserName(this.userNameModel).subscribe({
      next: (response: any) =>  {
        console.log(response);
        this.userNameTable = response.userapp.userName;
        this.firstNameTable = response.userapp.firstName;
        this.surNameTable = response.userapp.surname;
        this.profiletable = response.userapp.profile.profileName;
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
