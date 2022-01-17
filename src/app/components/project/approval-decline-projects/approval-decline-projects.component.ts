import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProjectRequest } from 'src/app/core/models/project-request';
import { StateRequest } from 'src/app/core/models/stateProjectRequest';
import { AuthService } from 'src/app/core/services/auth.service';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { ModalInformationProjectComponent } from 'src/app/shared/modal/modal-information-project.component';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-approval-decline-projects',
  templateUrl: './approval-decline-projects.component.html'
})
export class ApprovalDeclineProjectsComponent implements OnInit {

  paginador: any;
  routerPag: any;
  page=0;
  pageSize=10;
  projectId!:number;
  rowClicked!: any;
  selectedProduct: any;
  firstState:number=1;
  secondState:number=2;
  thirdState:number=3;
  projectListRequest!: Array<ProjectRequest>;
  listStateProjectRequest!:Array<StateRequest>;
  selectedState!:any;
  bsModalRef!: BsModalRef;
  constructor(private authService: AuthService, private projectService: ProjectService,
    private dialog: DialogComponent, private genericService:GenericListService,   private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getListProjectRequestByUserName(this.firstState,this.secondState,this.thirdState,this.authService.getUser(), this.page, this.pageSize);
    this.getListStateProjectRequest();
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

  getListStateProjectRequest(){
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
    this.getListProjectRequestByUserName(this.firstState,this.secondState,this.thirdState,this.authService.getUser(), this.page, this.pageSize);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getListProjectRequestByUserName(this.firstState,this.secondState,this.thirdState,this.authService.getUser(), this.page, this.pageSize);
  }

  changeTableRowColor(idx: any) {
    if (this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }

  RowSelected(u: any) {
    this.selectedProduct = u;
  }

  getListProjectRequestByUserName(firstSate:number,secondSate:number, thirdState:number,userName: string, page:number, pageSize:number) {
    const params = this.getRequestParams(page, pageSize);
    this.projectService.getListProjectRequest(firstSate,secondSate,thirdState,userName, params).subscribe({
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

}
