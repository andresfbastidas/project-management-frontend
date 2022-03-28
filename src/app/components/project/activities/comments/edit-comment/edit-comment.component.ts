import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/core/models/comment';
import { UpdateCommentRequest } from 'src/app/core/models/updateComment-request';
import { CommentService } from 'src/app/core/services/comment.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html'
})
export class EditCommentComponent implements OnInit {

  updateCommentRequest!: UpdateCommentRequest;
  comment!:any;
  commentDescription!:string;
  constructor(private commentService:CommentService, private shareMessage:SharedService, 
    private shareData:ShareDataService, private dialog:DialogComponent, private router:Router) { }

  ngOnInit(): void {
    this.getCommentObject();
  }

  back(){
    this.router.navigate(['/list-activities']);
  }

  getCommentObject():any {
    this.shareData.commentObjectObs.subscribe(response => {
      this.comment = response;
      this.commentDescription = response.commentDescription;
    });
  }

  updateComment()
  {
    this.comment.commentDescription =  this.commentDescription;
    this.updateCommentRequest = new UpdateCommentRequest(this.comment);
    this.commentService.updateComment(this.updateCommentRequest).subscribe({
      next: (response: any) =>  {
        this.shareMessage.msgInfo(response.message);
        this.router.navigate(['/list-comments']);
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

