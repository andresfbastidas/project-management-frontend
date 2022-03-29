import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/core/models/comment';
import { CommentService } from 'src/app/core/services/comment.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html'
})
export class ListCommentsComponent implements OnInit {

  activityId!:any;
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  currentIndex = -1;
  listComments!:Array<Comment>;
  constructor(private commentService:CommentService, private shareMessage:SharedService, 
    private shareData:ShareDataService, private dialog:DialogComponent, private router:Router) { }

  ngOnInit(): void {
    this.getData();
    this.getListComments();
  }

  getData():any {
    this.shareData.dataCommentObs.subscribe(response => {
      this.activityId = response;
    });
  }
  back(){
    this.router.navigate(['/list-activities']);
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getListComments();
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.getListComments();
  }

  routerUpdateComment(comment:Comment){
    this.shareData.sendObjectComment(comment);
    this.router.navigate(['/edit-comment']);
  }

  routerNewComment(){
    this.router.navigate(['/create-comment']);
  }

  getRequestParamsDelete(commentId:number): any {
    let params: any = {};

    if (commentId) {
      params[`commentId`] = commentId;
    }
    return params;
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

  deleteComment(commentId:number){
    const params = this.getRequestParamsDelete(commentId);
    this.commentService.deleteComment(params).subscribe({
      next: (response: any) =>  {
        this.shareMessage.msgInfo(response.message);
        this.getListComments();
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

  getListComments(){
    const params = this.getRequestParams(this.page, this.pageSize);
    this.commentService.getListComments(this.activityId, params).subscribe({
      next: (response: any) =>  {
       this.listComments = response.listComments;
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
