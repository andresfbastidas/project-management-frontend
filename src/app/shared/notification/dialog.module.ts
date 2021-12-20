import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationComponent } from './notification.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DialogComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  entryComponents: [
    NotificationComponent
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule {
}
