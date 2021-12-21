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
import { Idle, NgIdleModule } from '@ng-idle/core';
import { MessageService } from 'primeng/api';
import { DialogComponent } from './shared/notification/dialog.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MenuBarComponent,
    CreateprojectComponent,
    LoaderComponent,
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
    HttpClientModule
  ],
  providers: [MessageService, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
