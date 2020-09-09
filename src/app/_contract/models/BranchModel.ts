
export class BranchModel {

    id: number;
    branchPinCneeCnorMap: object;
    bkngBranchId: number;
    bkngBranchName: string;
    dlvryBranchHoldFlag: number;
    effectiveDt: Date;
    lkpBkngBranchHoldRsn: number;
    entityId: number;
    expDt: Date;
    assignBranchLevel: string;
// assignBranch: [{
//     id: number
//     branchPinCneeCnorMap: object
//     bkngBranchId: number,
//     bkngBranchName: string,
//     dlvryBranchHoldFlag: number,
//     effectiveDt: Date,
//     lkpBkngBranchHoldRsn: number,
//     entityId: number,
//     expDt: Date,
//     assignBranchLevel: string
// }]
referenceList: {
    bkngHoldRsn: [{
        id: number
        lookupVal: string
        descr: string
    }]


}
}