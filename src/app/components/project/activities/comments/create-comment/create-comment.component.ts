import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from 'src/app/core/models/comment';
import { CommentRequest } from 'src/app/core/models/comment-request';
import { CommentService } from 'src/app/core/services/comment.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html'
})
export class CreateCommentComponent implements OnInit {

  createCommentForm!:NgForm;
  commentDescription!:string;
  commentRequest!:CommentRequest;
  activity!:any;
  comment!:Comment;
  constructor(private router:Router, private dialog:DialogComponent,
    private sharedMessage:SharedService, private commentService:CommentService,
    private shareData:ShareDataService) { }

  ngOnInit(): void {
    this.getData();
  }

  back(){
    this.router.navigate(['/list-activities']);
  }

  clean(createActivityForm: any) {
    createActivityForm.resetForm();
  }

  getData():any {
    this.shareData.dataCommentObs.subscribe(response => {
      this.activity = response;
    });
  }

  createComment(){
    this.comment= new Comment(this.commentDescription);
    this.commentRequest = new CommentRequest(this.comment, this.activity);
     this.commentService.createComment(this.commentRequest).subscribe({
       next: (response: any) =>  {
         this.sharedMessage.msgInfo(response.message);
         this.router.navigate(['/list-activities']);
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
