import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/core/models/project';
import { AuthService } from 'src/app/core/services/auth.service';
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
  rowClicked!: any;
  enabled!: boolean;
  constructor(private authService: AuthService, private projectService: ProjectService,
    private dialog: DialogComponent, private sharedMessage: SharedService, private shareData: ShareDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getListProjectsByUserName(this.authService.getUser());
  }

  sendData(data: any) {
    this.shareData.sendData(data);
  }

  RowSelected(u: any) {
    this.selectedProduct = u;
  }

  clean(projectListForm: any) {
    projectListForm.resetForm();
    this.rowClicked = null;
  }
  changeTableRowColor(idx: any) {
    if (this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
  }

  listActivities() {
    this.sendData(this.selectedProduct.projectId);
    this.router.navigate(['/list-activities']);
  }
  getListProjectsByUserName(userName: string) {
    this.projectService.getListProjectsByUserName(userName).subscribe({
      next: (response: any) => {
        this.projectList = response.projectList as Array<Project>;
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
