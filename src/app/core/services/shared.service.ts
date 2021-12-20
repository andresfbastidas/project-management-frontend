import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private readonly titleService: Title,
    private readonly dialog: DialogComponent
  ) { }

  msgErr(err: any): void {
    const title = this.titleService.getTitle();
    this.dialog.show({
        title,
        content: this.dialog.formatError(err),
        type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
    });
  }

  msgInfo(msg:any) : void {
    const title = this.titleService.getTitle();
    this.dialog.show({
        title,
        content: msg,
        type: "success",
        showFooter: false
    });
  }
 
}
