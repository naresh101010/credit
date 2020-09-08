
export class BranchModel{
    assignBranch :[{
                    bkngBranchId: number
                    effectiveDt: Date
                    billableWghtFlag: number
                    bkngBranchHoldFlag: number
                    dlvryBranchHoldFlag: number
                    lkpBkngBranchHoldRsn: number
                    lkpDlvryBranchHoldRsn: number
                    expDt: Date
                    id: number
                    branchPinCneeCnorMap: object
                    ratecardId: number
                }]
    referenceList :{
                    bookingBranchList:[{
                                        branchId:number
                                        branchCode:string
                                        branchName:string
                                     }]
                        dlvryHoldRsn:[{
                                        id:number
                                        lookupVal:string
                                        descr:string
                                     }]
                }
}