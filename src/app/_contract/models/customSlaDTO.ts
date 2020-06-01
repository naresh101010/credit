export class customSlaDTO {
    id: number
    lkpSrcTypeId: number
    lkpDestTypeId: number
    srcId: number
    destId: number
    slaRrFlag: number
    slaDays: number
    ratecardId: number
    defaultFlagFromSla : boolean = true;
    defaultFlagToSla : boolean = true;
    isNewSla : boolean = true;
    fromTypeValidation : boolean = false;
    toTypeValidation : boolean = false;
    fromValidation : boolean = false;
    toValidation : boolean = false;
    slaDaysValidation : boolean = false;
}