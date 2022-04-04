export class Comment{
    commentDescription!:string;
    creationDate!:Date;
    commentId!:number;
    constructor(commentDescription:string){
        this.commentDescription = commentDescription;
    }
}