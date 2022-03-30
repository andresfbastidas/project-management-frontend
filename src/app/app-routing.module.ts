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
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { ModalInformationProjectComponent } from './shared/modal/modal-information-project.component';
import { CreateCommentComponent } from './components/project/activities/comments/create-comment/create-comment.component';
import { ListCommentsComponent } from './components/project/activities/comments/list-comments/list-comments.component';
import { EditCommentComponent } from './components/project/activities/comments/edit-comment/edit-comment.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLoadGuard } from './core/guards/authLoad.guard';
const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuBarComponent,  canActivate: [AuthGuard] },
  { path: 'create-project', component: CreateprojectComponent,  canActivate: [AuthGuard]},
  { path: 'list-project-user', component: ListProjectUserComponent,  canActivate: [AuthGuard] },
  { path: 'list-activities', component: ListActivitiesComponent,  canActivate: [AuthGuard] },
  { path: 'create-activity', component: CreateActivityComponent,  canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard], canLoad:[AuthLoadGuard] },
  { path: 'approval-projects', component: ApprovalDeclineProjectsComponent },
  { path: 'add-user-project', component: AddUserProjectComponent, canActivate: [AuthGuard], canLoad:[AuthLoadGuard]  },
  { path: 'edit-user', component: EditRemoveUserComponent, canActivate: [AuthGuard], canLoad:[AuthLoadGuard]  },
  { path: 'list-projects', component: ListProjectsComponent,  canActivate: [AuthGuard] },
  { path: 'edit-project', component: EditProjectComponent,  canActivate: [AuthGuard] },
  { path: 'project-information', component: ModalInformationProjectComponent,  canActivate: [AuthGuard] },
  { path: 'create-comment', component: CreateCommentComponent,  canActivate: [AuthGuard] },
  { path: 'list-comments', component: ListCommentsComponent,  canActivate: [AuthGuard] },
  { path: 'edit-comment', component: EditCommentComponent,  canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
