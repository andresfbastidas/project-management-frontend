import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-edit-remove-user',
  templateUrl: './edit-remove.user-component.html',
})
export class EditRemoveUserComponent implements OnInit {

  userNameModel!:string;
  emailModel!:string;
  passwordModel!:string;
  firstNameModel!:string;
  secondNameModel!:string;
  surnameModel!:string;
  secondSurnameModel!:string;
  selectedProfile!:any;
  listProfiles!:Array<Profile>;
  hidePassword=true;
  public showPasswordOnPress!: boolean;
  constructor(private dialog:DialogComponent, private userService:UserService, private sharedMessage: SharedService,
    private genericListService:GenericListService) { }

  ngOnInit(): void {
    this.getAllProfilesUser();
  }

  clean(editRemoveForm: any) {
    editRemoveForm.resetForm();
  }
  valueChangeProfile(event: any) {
    event.target.value = this.selectedProfile;
  }

  getAllProfilesUser(){
    this.genericListService.getAllProfiles().subscribe(response =>{
      this.listProfiles = response.genericList as Array<Profile>
    })
  }

  findUser(){
    this.userService.findUserName(this.userNameModel).subscribe({
      next: (response: any) =>  {
        this.emailModel=response.userapp.email;
        this.firstNameModel=response.userapp.firstName;
        this.secondNameModel=response.userapp.secondName;
        this.surnameModel=response.userapp.surname;
        this.secondSurnameModel=response.userapp.secondSurname;
        this.selectedProfile=response.userapp.profile.profileName;
        console.log(this.selectedProfile);
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
