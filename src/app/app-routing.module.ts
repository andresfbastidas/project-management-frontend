import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarComponent } from './components/menubar/menu-bar-component';
import { CreateprojectComponent } from './components/project/create-project/createproject.component';
import { LoginComponent } from './components/security/login/login.component';
import { ListProjectUserComponent } from './components/project/list-project-user/list-project-user.component';
import { ListActivitiesComponent } from './components/project/activities/list-activities/list-activities.component';
import { CreateActivityComponent } from './components/project/activities/create-activity/create-activity.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ApprovalDeclineProjectsComponent } from './components/project/approval-decline-projects/approval-decline-projects.component';
import { AddUserProjectComponent } from './components/project/add-user-project/add-user-project.component';
import { EditRemoveUserComponent } from './components/user/remove-edit-user/edit-remove-user.component';
import { ListProjectsComponent } from './components/project/list-projects/list-projects.component';
const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuBarComponent },
  { path: 'create-project', component: CreateprojectComponent },
  { path: 'list-project-user', component: ListProjectUserComponent },
  { path: 'list-activities', component: ListActivitiesComponent },
  { path: 'create-activity', component: CreateActivityComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'approval-projects', component: ApprovalDeclineProjectsComponent },
  { path: 'add-user-project', component: AddUserProjectComponent },
  { path: 'edit-user', component: EditRemoveUserComponent },
  { path: 'list-projects', component: ListProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
