import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
  }

}
