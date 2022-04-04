import { Comment } from "./comment";

export class UpdateCommentRequest{
    comment!:Comment;

    constructor(comment:Comment){
      this.comment = comment;
    }
}