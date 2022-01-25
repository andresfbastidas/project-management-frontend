import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/core/models/project';
import { State } from 'src/app/core/models/state';
import { AuthService } from 'src/app/core/services/auth.service';
import { GenericListService } from 'src/app/core/services/generic-list.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-list-project-user',
  templateUrl: './list-project-user.component.html'
})
export class ListProjectUserComponent implements OnInit {

  projectList!: Array<Project>;
  projectListForm!: NgForm;
  selectedProduct: any;
  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 12];
  currentIndex = -1;
  rowClicked!: any;
  enabled!: boolean;
  paginador: any;
  routerPag: any;
  finishedState: number = 3;
  progressState:number = 4;
  avalaibleState:number =5;
  projectId!:number;
  states!: Array<State>;
  selectedStateModel!: any;
  @Output() projectEvent = new EventEmitter<any>();

  constructor(private authService: AuthService, private projectService: ProjectService,
    private dialog: DialogComponent, private sharedMessage: SharedService, private shareData: ShareDataService,
    private router: Router, private readonly activatedRoute:ActivatedRoute, private genericListService: GenericListService) { }

  ngOnInit(): void {
      this.getListProjectsByUserName();
      this.getStates();
  }

  sendData(data: any) {
    this.shareData.sendData(data);
  }

  valueChangeState(event: any) {
    event.target.value;
    console.log(event.target.value);
  }


  RowSelected(u: any) {
    this.selectedProduct = u;
    this.projectId = this.selectedProduct.projectId;
    this.getProjectId(this.projectId);
  }

  clean(projectListForm: any) {
    projectListForm.resetForm();
    this.rowClicked = null;
  }
  changeTableRowColor(idx: any) {
    if (this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }

  getProjectId(projectId:any) {
    this.projectEvent.emit(projectId);
  }

  listActivities() {
    this.sendData(this.selectedProduct.projectId);
    this.router.navigate(['/list-activities']);
  }

  getStates() {
    this.genericListService.getAllStates(0, 0, 0, this.progressState, this.avalaibleState).subscribe(response => {
      this.states = response.genericList as Array<State>;
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

  handlePageChange(event: number): void {
    this.page = event;
    this.getListProjectsByUserName();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getListProjectsByUserName();
  }

  getListProjectsByUserName() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.projectService.getListProjectsByUserName(this.authService.getUser(), params).subscribe({
      next: (response: any) => {
        this.projectList = response.projectList as Array<Project>;
        this.count = response.totalElements;
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
