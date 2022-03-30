import { Component, OnInit } from '@angular/core';
import { AuthLoadGuard } from 'src/app/core/guards/authLoad.guard';
import { Profile } from 'src/app/core/models/profile';
import { SignupRequest } from 'src/app/core/models/signup-request';
import { UserApp } from 'src/app/core/models/userApp';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent implements OnInit {

  userNameModel!:string;
  emailModel!:string;
  passwordModel!:string;
  firstNameModel!:string;
  secondNameModel!:string;
  surnameModel!:string;
  secondSurnameModel!:string;
  selectedProfile!:any;
  listProfiles!:Array<Profile>;
  signupRequest!:SignupRequest;
  hidePassword=true;
  public showPasswordOnPress!: boolean;
  constructor(private userService:UserService, private genericListService:GenericListService,
    private dialog:DialogComponent, private sharedMessage:SharedService, private guard: AuthLoadGuard) { }

  ngOnInit(): void {
    this.getAllProfilesUser();
    this.guard.canLoad();
  }

  clean(createUserForm: any) {
    createUserForm.resetForm();
  }
  valueChangeProfile(event: any) {
    event.target.value = this.selectedProfile;
  }

  getAllProfilesUser(){
    this.genericListService.getAllProfiles().subscribe(response =>{
      this.listProfiles = response.genericList as Array<Profile>
    })
 }

  createUser(createUserForm: any){
    let profile = new Profile(this.selectedProfile, this.selectedProfile);
    let userApp = new UserApp(this.emailModel, this.firstNameModel, this.passwordModel,
      this.secondNameModel, this.secondSurnameModel, this.surnameModel, 
      this.userNameModel, profile);
      this.signupRequest = new SignupRequest(userApp);
      this.userService.createUser(this.signupRequest).subscribe({
        next: (response: any) =>  {
          this.sharedMessage.msgInfo(response.message);
          this.clean(createUserForm);
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
