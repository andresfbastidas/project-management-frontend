import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/core/models/profile';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';
import { UserApp } from 'src/app/core/models/userApp';
import { generate } from 'json-merge-patch'

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
  userCopy!: UserApp;
  newUser!: UserApp;
  patch!: any;
  constructor(private dialog: DialogComponent, private userService: UserService, private sharedMessage: SharedService,
    private genericListService: GenericListService) { }

  ngOnInit(): void {
    this.getAllProfilesUser();
    this.disabledInputs = false;
  }

  clean(editRemoveForm: any) {
    editRemoveForm.resetForm();
    this.disabledInputs = false;
  }
  valueChangeProfile(event: any) {
    event.target.value = this.selectedProfile;
  }


  getAllProfilesUser() {
    this.genericListService.getAllProfiles().subscribe(response => {
      this.listProfiles = response.genericList as Array<Profile>
    })
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
        this.passwordModel = response.userapp.password;
        this.disabledInputs = true;
        this.userCopy = response.userapp;
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


  getRequestParams(userName: string): any {
    let params: any = {};

    if (userName) {
      params[`userName`] = userName;
    }
    return params;
  }

  updateUser(editRemoveForm: any) {
    const params = this.getRequestParams(this.userNameModel);
    const profile = new Profile(this.selectedProfileId, this.selectedProfile);
    this.newUser = new UserApp(this.emailModel, this.firstNameModel, this.passwordModel, this.secondNameModel,
      this.secondSurnameModel, this.surnameModel, this.userNameModel, profile);
    this.patch = generate(this.userCopy, this.newUser);

    this.userService.updateUser(params, this.patch).subscribe({
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
