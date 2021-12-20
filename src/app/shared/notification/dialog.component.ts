import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationComponent } from './notification.component';

@Component({
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
  showFooter = true;
  disableClose = true;
  showHeader = true;
  showTechInfo = true;
  showCancelButton = true;
  showConfirmButton = true;

  type = "info";
  title = "";
  content = "";
  footer = "";
  styleClass = "w-50";
  linkTech = "Más información";
  textTech = "";
  confirmButtonClass = "btn-primary";
  confirmButtonText = "Si";
  cancelButtonClass = "btn-danger";
  cancelButtonText = "Cancelar";
  defaultButtonText = "Aceptar";
  defaultButtonClass = "btn-primary";

  //se utiliza para el dialogform, para enviar datos especificos
  customDataForm: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  show(params: {
    title?: string,
    type?: string,
    content?: string,
    footer?: string,
    showFooter?: boolean,
    disableClose?: boolean,
    modal?: boolean,
    responsive?: boolean,
    showHeader?: boolean,
    maximizable?: boolean,
    showTechInfo?: boolean,
    showCancelButton?: boolean,
    showConfirmButton?: boolean,
    styleClass?: string,
    linkTech?: string,
    textTech?: string,
    confirmButtonClass?: string,
    confirmButtonText?: string,
    cancelButtonClass?: string,
    cancelButtonText?: string,
    defaultButtonText?: string,
    defaultButtonClass?: string,
    baseZIndex?: number,
    customDataForm?: any
  }) {
    this.manageContent(params);
    this.manageVisibility(params);
    this.manageButtons(params);

    params.customDataForm = params.customDataForm === undefined ? this.customDataForm : params.customDataForm;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = params.disableClose === undefined ? this.disableClose : params.disableClose;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = params.styleClass === undefined ? this.styleClass : params.styleClass;
    dialogConfig.data = params;

    return this.dialog.open(NotificationComponent, dialogConfig);
  }//show

  manageContent(params: any): any {
    params.title = params.title === undefined ? this.title : params.title;
    params.type = params.type === undefined ? this.type : params.type;
    params.content = params.content === undefined ? this.content : params.content;
    params.footer = params.footer === undefined ? this.footer : params.footer;

    return params;
  }//manageContent

  manageButtons(params: any): any {
    params.linkTech = params.linkTech === undefined ? this.linkTech : params.linkTech;
    params.textTech = params.textTech === undefined ? this.textTech : params.textTech;
    params.confirmButtonClass = params.confirmButtonClass === undefined ? this.confirmButtonClass : params.confirmButtonClass;
    params.confirmButtonText = params.confirmButtonText === undefined ? this.confirmButtonText : params.confirmButtonText;
    params.cancelButtonClass = params.cancelButtonClass === undefined ? this.cancelButtonClass : params.cancelButtonClass;
    params.cancelButtonText = params.cancelButtonText === undefined ? this.cancelButtonText : params.cancelButtonText;
    params.defaultButtonText = params.defaultButtonText === undefined ? this.defaultButtonText : params.defaultButtonText;
    params.defaultButtonClass = params.defaultButtonClass === undefined ? this.defaultButtonClass : params.defaultButtonClass;

    return params;
  }//manageButtons

  manageVisibility(params: any): any {
    params.showFooter = params.showFooter === undefined ? this.showFooter : params.showFooter;
    params.showHeader = params.showHeader === undefined ? this.showHeader : params.showHeader;
    params.showTechInfo = params.showTechInfo === undefined ? this.showTechInfo : params.showTechInfo;
    params.showCancelButton = params.showCancelButton === undefined ? this.showCancelButton : params.showCancelButton;
    params.showConfirmButton = params.showConfirmButton === undefined ? this.showConfirmButton : params.showConfirmButton;

    return params;
  }//manageVisibility

  formatError(err: any): any {
    const message = (err.error.message !== undefined) ? err.error.message : "";
    const trace = (err.error.trace !== undefined) ? err.error.trace : "";
    const faults = (err.error.fault !== undefined) ? err.error.fault.errors.reduce(function (msg:any, error:any) {
      return error.userMessage + "\n";
    }, 0) : "";

    return `${faults} \n ${message} \n\n ${trace}`;
  }//formatError

  formatErrorMessage(err: any): any {
    const message = err;
    this.showTechInfo = false;
    return `${message}`;
  }//formatError


  formatErrorFaults(err: any): any {
    const faults = (err.error.fault !== undefined) ? err.error.fault.errors.reduce(function (msg:any, error:any) {
      return error.tecnicalMessage + "\n";
    }, 0) : "";

    return `${faults}`;
  }//formatErrorFaults
}

