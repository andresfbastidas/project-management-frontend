import { Activity } from "./activity";
import { Comment } from "./comment";

export class CommentRequest{
    comment!:Comment;
    activityId!:number
    constructor(comment:Comment, activityId:number){
       this.comment = comment;
       this.activityId = activityId;
    }
}