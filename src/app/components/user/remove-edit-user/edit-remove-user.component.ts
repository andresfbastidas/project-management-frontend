import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';
import { UserApp } from 'src/app/core/models/userApp';
import { SignupRequest } from 'src/app/core/models/signup-request';
import { AuthLoadGuard } from 'src/app/core/guards/authLoad.guard';

@Component({
  selector: 'app-edit-remove-user',
  templateUrl: './edit-remove.user-component.html',
})
export class EditRemoveUserComponent implements OnInit {

  userNameModel!: string;
  emailModel!: string;
  passwordModel!: string;
  firstNameModel!: string;
  secondNameModel!: string;
  surnameModel!: string;
  secondSurnameModel!: string;
  selectedProfile!: any;
  selectedProfileId!: any;
  listProfiles!: Array<Profile>;
  hidePassword = true;
  public showPasswordOnPress!: boolean;
  disabledInputs: boolean = false;
  patch!: any;
  newUser!:UserApp;
  signupRequest!:SignupRequest;
  constructor(private dialog: DialogComponent, private userService: UserService, private sharedMessage: SharedService,
    private genericListService: GenericListService, private guard:AuthLoadGuard) { }

  ngOnInit(): void {
    this.getAllProfilesUser();
    this.disabledInputs = false;
    this.guard.canLoad();
  }

  clean(editRemoveForm: any) {
    editRemoveForm.resetForm();
    this.disabledInputs = false;
  }
  valueChangeProfile(event: any) {
    event.target.value = this.selectedProfile;
    console.log(event.target);
  }


  getAllProfilesUser() {
    this.genericListService.getAllProfiles().subscribe(response => {
      this.listProfiles = response.genericList as Array<Profile>
    })
  }

  getRequestParams(userName: string): any {
    let params: any = {};

    if (userName) {
      params[`userName`] = userName;
    }
    return params;
  }

  findUser() {
    this.userService.findUserName(this.userNameModel).subscribe({
      next: (response: any) => {
        this.emailModel = response.userapp.email;
        this.firstNameModel = response.userapp.firstName;
        this.secondNameModel = response.userapp.secondName;
        this.surnameModel = response.userapp.surname;
        this.secondSurnameModel = response.userapp.secondSurname;
        this.selectedProfile = response.userapp.profile.profileName;
        this.selectedProfileId = response.userapp.profile.profileId;
        this.disabledInputs = true;
      },
      error: (err) => {
        if (err.status == 500) {
          this.dialog.show({
            title: "Error",
            content: this.dialog.formatError(err),
            type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
          });
        }
      }
    });
  }


  updateUser(editRemoveForm: any) {
    const profile = new Profile(this.selectedProfileId, this.selectedProfile);
    this.newUser = new UserApp(this.emailModel, this.firstNameModel, this.passwordModel, this.secondNameModel,
      this.secondSurnameModel, this.surnameModel, this.userNameModel, profile);
      this.signupRequest = new SignupRequest(this.newUser);
    this.userService.updateUser(this.signupRequest).subscribe({
      next: (response: any) => {
        this.sharedMessage.msgInfo(response.message);
        this.clean(editRemoveForm);
      },
      error: (err) => {
        if (err.status == 500) {
          this.dialog.show({
            title: "Error",
            content: this.dialog.formatError(err),
            type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
          });
        }
      }
    });
  }

  deleteUser(editRemoveForm: any){
    const params = this.getRequestParams(this.userNameModel);
    this.userService.deleteUser(params).subscribe({
      next: (response: any) => {
        this.sharedMessage.msgInfo(response.message);
        this.clean(editRemoveForm);
      },
      error: (err) => {
        if (err.status == 500) {
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
