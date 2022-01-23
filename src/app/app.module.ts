import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/security/login/login.component';
import { MenuBarComponent } from './components/menubar/menu-bar-component';
import {MenuModule} from 'primeng/menu';
import { CreateprojectComponent } from './components/project/create-project/createproject.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
    import { MatNativeDateModule } from '@angular/material/core';
import { LoaderComponent } from './shared/loader/loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from './shared/notification/dialog.module';
import { NgIdleModule } from '@ng-idle/core';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { DialogComponent } from './shared/notification/dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ListProjectUserComponent } from './components/project/list-project-user/list-project-user.component';
import { ListActivitiesComponent } from './components/project/activities/list-activities/list-activities.component';
import { CreateActivityComponent } from './components/project/activities/create-activity/create-activity.component';
import { ApprovalDeclineProjectsComponent } from './components/project/approval-decline-projects/approval-decline-projects.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddUserProjectComponent } from './components/project/add-user-project/add-user-project.component';
import { ModalInformationProjectComponent } from './shared/modal/modal-information-project.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditRemoveUserComponent } from './components/user/remove-edit-user/edit-remove-user.component';
import { ListProjectsComponent } from './components/project/list-projects/list-projects.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MenuBarComponent,
    CreateprojectComponent,
    LoaderComponent,
    CreateUserComponent,
    ListProjectUserComponent,
    ListActivitiesComponent,
    CreateActivityComponent,
    ApprovalDeclineProjectsComponent,
    AddUserProjectComponent,
    ModalInformationProjectComponent,
    EditRemoveUserComponent,
    ListProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    DialogModule,
    NgIdleModule.forRoot(),
    HttpClientModule,
    ToastModule,
    NgxPaginationModule,
    ModalModule.forRoot()//<<======
  ],
  providers: [MessageService, DialogComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalInformationProjectComponent //<<======
  ]
})
export class AppModule { }
