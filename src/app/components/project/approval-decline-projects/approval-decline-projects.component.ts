import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApprovalRequest } from 'src/app/core/models/approval-request';
import { ProjectRequest } from 'src/app/core/models/project-request';
import { StateRequest } from 'src/app/core/models/stateProjectRequest';
import { AuthService } from 'src/app/core/services/auth.service';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { ModalInformationProjectComponent } from 'src/app/shared/modal/modal-information-project.component';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-approval-decline-projects',
  templateUrl: './approval-decline-projects.component.html'
})
export class ApprovalDeclineProjectsComponent implements OnInit {

  paginador: any;
  routerPag: any;
  page = 0;
  pageSize = 10;
  projectId!: number;
  rowClicked!: any;
  selectedProduct: any;
  firstState: number = 1;
  secondState: number = 2;
  thirdState: number = 3;
  projectListRequest!: Array<ProjectRequest>;
  listStateProjectRequest!: Array<StateRequest>;
  selectedState!: any;
  bsModalRef!: BsModalRef;
  detailsText!: string;
  checkedList: any;
  selectedAll!:boolean;
  selectedOption:any;
  projectDirector!:string;
  constructor(public authService: AuthService, private projectService: ProjectService,
    private dialog: DialogComponent, private genericService: GenericListService,
    private modalService: BsModalService,  private sharedMessage:SharedService) { }

  ngOnInit(): void {
    if (this.authService.getRol() == 'DIRECTOR') {
      this.getListProjectRequestByUserDirector(this.firstState, this.secondState, this.thirdState, this.authService.getUser(), this.page, this.pageSize);
    } else {
      this.getListProjectRequestByUserName(this.firstState, this.secondState, this.thirdState, this.authService.getUser(), this.page, this.pageSize);
    }
    this.getListStateProjectRequest();
    this.checkedList=0;
  }

  clean(projectRequestListForm: any) {
    projectRequestListForm.resetForm();
    this.rowClicked = null;
  }

  openModal() {
    this.bsModalRef = this.modalService.show(ModalInformationProjectComponent, {
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    });
  }

  getListStateProjectRequest() {
    this.genericService.getAllStatesRequest().subscribe(response => {
      this.listStateProjectRequest = response.genericList as Array<StateRequest>;
    });
  }

  valueChangeStateRequest(event: any) {
    event.target.value = this.selectedState;
  }

  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getListProjectRequestByUserName(this.firstState, this.secondState, this.thirdState, this.authService.getUser(), this.page, this.pageSize);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getListProjectRequestByUserName(this.firstState, this.secondState, this.thirdState, this.authService.getUser(), this.page, this.pageSize);
  }


  trackByIndex(index: number, obj: any): any {
    return index;
  }

  selectAll() {
    for (var i = 0; i < this.projectListRequest.length; i++) {
      this.projectListRequest[i].isSelected = this.selectedAll;
    }
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.projectListRequest.length; i++) {
      if (this.projectListRequest[i].isSelected) {
        this.checkedList.push(this.projectListRequest[i]);
      }
    }
  }

  onNgModelChange($event:any){
    this.selectedOption=$event;

  }
  checkIfAllSelected() {
    this.selectedAll = this.projectListRequest.every(function(transactions:any) {
        return transactions.isSelected;
      })
      this.getCheckedItemList();
  }

  getListProjectRequestByUserName(firstSate: number, secondSate: number, thirdState: number, userName: string, page: number, pageSize: number) {
    const params = this.getRequestParams(page, pageSize);
    this.projectService.getListProjectRequest(firstSate, secondSate, thirdState, userName, params).subscribe({
      next: (response: any) => {
        this.projectListRequest = response.listProjectRequests as Array<ProjectRequest>;
      },
      error: (err) => {
        this.dialog.show({
          title: "Error",
          content: this.dialog.formatError(err),
          type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
        });
      }
    });
  }

  getListProjectRequestByUserDirector(firstSate: number, secondSate: number, thirdState: number, userName: string, page: number, pageSize: number) {
    const params = this.getRequestParams(page, pageSize);
    this.projectService.getListProjectRequestByDirector(firstSate, secondSate, thirdState, userName, params).subscribe({
      next: (response: any) => {
        this.projectListRequest = response.listProjectRequests as Array<ProjectRequest>;
        this.projectDirector = response.listProjectRequests.projectDirector;
        for (let index = 0; index < this.projectListRequest.length; index++) {
          const element = this.projectListRequest[index];
          this.projectDirector = element.projectDirector;
        }
      },
      error: (err) => {
        this.dialog.show({
          title: "Error",
          content: this.dialog.formatError(err),
          type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
        });
      }
    });
  }

  approvalProject(createProjectForm: any){
    let approvalRequest = new ApprovalRequest(this.checkedList, this.projectDirector);
    this.projectService.approvalProjects(approvalRequest).subscribe({
      next: (response: any) =>  {
        this.sharedMessage.msgInfo(response.message);
        this.clean(createProjectForm);
      },
      error: (err) => {
        if(err.status == 500){
          this.dialog.show({
            title: "Error",
            content: this.dialog.formatError(err),
            type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
          });
        }
      }
    });
  }

}
