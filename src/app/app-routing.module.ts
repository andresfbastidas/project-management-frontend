import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarComponent } from './components/menubar/menu-bar-component';
import { CreateprojectComponent } from './components/project/create-project/createproject.component';
import { LoginComponent } from './components/security/login/login.component';
import { ListProjectUserComponent } from './components/project/list-project-user/list-project-user.component';
const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuBarComponent },
  { path: 'create-project', component: CreateprojectComponent },
  { path: 'list-project-user', component: ListProjectUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
