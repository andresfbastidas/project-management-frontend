import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html'
})
export class CreateActivityComponent implements OnInit {

  dateFromModel!:Date;
  dateUntilModel!:Date;
  constructor() { }

  ngOnInit(): void {
  }

}
