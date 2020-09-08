export class vmiDTO {
    id: number
    cnorId: number
    cneeId: number
    vmiFlag: number
    lkpVmiTypeId: number
    ratecardId: number
    cnorValidation : boolean = false;
    cneeValidation : boolean = false;
    vmiTypeValidation : boolean = false;
    isNewVMI : boolean;
}
