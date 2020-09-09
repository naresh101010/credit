export class MSAModel {
    public id: number;
    public custName: string;
    public custLevel: string;
    public descr: string;
    public status: number;
    public effectiveDt: Date;
    public expDt: Date; 
    public notepadTrans: notepadTransModel[];
    //public closeDt: string;
    public crtdBy: string;
    public crtdDt: string;
    public updBy: string;
    public updDt: string;
    public sla: number;


    constructor() {}
}


export class notepadTransModel {
    public id: number;
    public notepadId: number;
    public notepadInputVal: string;
    public entityRefId: number;

    constructor() {}
}