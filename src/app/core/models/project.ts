import { State } from "./state";

export class Project {

    projectId!:number;
    projectTitle!:String;
    dateFrom!:Date;
    dateUntil!:Date;
    generalObjetive!:String;
    justification!:String;
    projectMethology!:String;
    projectResearchTypologyId!:number;
    projectSummary!:String;
    specificObjetive!:String;
    isSelected!:boolean;
    projectDirector!:string;
    directorName!:string
    state!:State;
    createBy!:string;
    users!:string;
    createByNames!:string;

    constructor(projectTitle:String, dateFrom:Date, dateUntil:Date, generalObjetive:String,
        justification:string, projectMethology:string, projectResearchTypologyId:number,
        projectSummary:string, specificObjetive:string, projectDirector:string,createBy:string){
        this.projectTitle = projectTitle;
        this.dateFrom = dateFrom;
        this.dateUntil = dateUntil;
        this.generalObjetive = generalObjetive;
        this.justification = justification;
        this.projectMethology = projectMethology;
        this.projectResearchTypologyId = projectResearchTypologyId;
        this.projectSummary = projectSummary;
        this.specificObjetive = specificObjetive;
        this.createBy = createBy;
        this.projectDirector = projectDirector;
    }
}