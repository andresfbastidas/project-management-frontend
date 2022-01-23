import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApprovalRequest } from 'src/app/core/models/approval-request';
import { DeclineRequest } from 'src/app/core/models/decline-request';
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
  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 12];
  projectId!: number;
  rowClicked!: any;
  selectedProduct: any;
  firstState: number = 1;
  secondState: number = 2;
  thirdState: number = 3;
  projectListRequest: Array<ProjectRequest>= [];
  listStateProjectRequest!: Array<StateRequest>;
  selectedState!: any;
  bsModalRef!: BsModalRef;
  detailsText!: string;
  checkedList: any;
  selectedAll!: boolean;
  selectedOption: any;
  projectDirector!: string;
  disabled =true;
  currentIndex = -1;
  constructor(public authService: AuthService, private projectService: ProjectService,
    private dialog: DialogComponent, private genericService: GenericListService,
    private modalService: BsModalService, private sharedMessage: SharedService) { }

  ngOnInit(): void {
    if (this.authService.getRol() == 'DIRECTOR') {
      this.getListProjectRequestByUserDirector();
    } else {
      this.getListProjectRequestByUserName();
    }
    this.disabled = true;
    this.getListStateProjectRequest();
    this.checkedList = 0;
  }

  clean(projectRequestListForm: any) {
    projectRequestListForm.resetForm();
    this.rowClicked = null;
    this.firstState = 1;
    this.secondState = 2;
    this.thirdState = 3;
    if (this.authService.getRol() == 'DIRECTOR') {
      this.getListProjectRequestByUserDirector();
    } else {
      this.getListProjectRequestByUserName();
    }
  }

  openModal() {
    console.log(this.projectListRequest);
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


  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params[`numPage`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  valueChangeStateRequest(event: any): void {
    this.firstState = event.target.value;
    this.secondState = event.target.value;
    this.thirdState = event.target.value;
    if (this.authService.getRol() == 'DIRECTOR') {
      this.getListProjectRequestByUserDirector();
    } else {
      this.getListProjectRequestByUserName();
    }
  }

  handlePageChange(event: number): void {
    this.page = event;
    if (this.authService.getRol() == 'DIRECTOR') {
      this.getListProjectRequestByUserDirector();
    } else {
      this.getListProjectRequestByUserName();
    }
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    if (this.authService.getRol() == 'DIRECTOR') {
      this.getListProjectRequestByUserDirector();
    } else {
      this.getListProjectRequestByUserName();
    }
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
    console.log(this.checkedList);
  }

  onNgModelChange($event: any) {
    this.selectedOption = $event;

  }
  checkIfAllSelected() {
    this.selectedAll = this.projectListRequest.every(function (transactions: any) {
      return transactions.isSelected;
    })
    this.getCheckedItemList();
  }

  getProjectId(projectId:any, projectRequestId:any){
    console.log(projectId, projectRequestId);
  }

  getListProjectRequestByUserName() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.projectService.getListProjectRequest(this.firstState, this.secondState, this.thirdState, this.authService.getUser(), params).subscribe({
      next: (response: any) => {
        this.projectListRequest = response.listProjectRequests as Array<ProjectRequest>;
        this.count = response.totalElements;
        this.detailsText = response.listProjectRequests.details;
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

  refresh(){
    this.getListProjectRequestByUserDirector();
    this.getListProjectRequestByUserName();
  }

  getListProjectRequestByUserDirector() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.projectService.getListProjectRequestByDirector(this.firstState, this.secondState, this.thirdState, this.authService.getUser(), params).subscribe({
      next: (response: any) => {
        this.projectListRequest = response.listProjectRequests as Array<ProjectRequest>;
        this.projectDirector = response.listProjectRequests.projectDirector;
        this.count = response.totalElements;
        //this.refresh();
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

  approvalProject(createProjectForm: any) {
    let approvalRequest = new ApprovalRequest(this.checkedList, this.authService.getUser());
    this.projectService.approvalProjects(approvalRequest).subscribe({
      next: (response: any) => {
        this.sharedMessage.msgInfo(response.message);
        this.clean(createProjectForm);
        this.refresh();
      },
      error: (err) => {
        if (err.status == 500) {
          this.dialog.show({
            title: "Error",
            content: this.dialog.formatError(err),
            type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
          });
        }
      }
    });
  }

  declineProject(createProjectForm: any) {
    let declineRequest = new DeclineRequest(this.checkedList);
    this.projectService.declineProjects(declineRequest).subscribe({
      next: (response: any) => {
        this.sharedMessage.msgInfo(response.message);
        this.clean(createProjectForm);
      },
      error: (err) => {
        if (err.status == 500) {
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
