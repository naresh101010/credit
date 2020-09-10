export class CreateAssoModel {

    id: number;
    assocCode : string;
    tdsPercent:number;
    aadhaarNum: string;
    altMob: string;
    assocRegdType: string;
    bankAcc: string;
    bankAddr: string;
    bankName: string;
    chqFavour: string;
    companyName: string;
    contactFname: string;
    contactLname: string;
    contactMname: string;
    crtdBy: string;
    gstnRegdFlag: string;
    tdsCertFlag: string;
    annivDt: string;
    crtdDt: string;
    descr: string;
    dob: string;
    effectiveDt: string;
    emergencyPhone: string;
    estDt: string;
    expDt: string;
    gstinNum: string;
    gender: string;
    ifscCode: string;
    lkpPymtMethodId: string;
    mob: string;
    ofcEmail: string;
    panNum: string;
    personalEmail: string;
    status: string;
    updDt: string;
    whatsappNum: string;
    maritalStatus: string;
    securityDepositAmt: string;
    updBy: string;
    advncAmt: string;
    ofcAddrBook: {
        id: number;
        addr1: string;
        addr2: string;
        addr3: string;
        longitude: string;
        latitude: string;
        pincodeId: string;
        effectiveDt: string;
        status: string;
        expDt: string;
    };
    resAddrBook: {
        id: number;
        addr1: string;
        addr2: string;
        addr3: string;
        longitude: string;
        latitude: string;
        pincodeId: string;
        effectiveDt: string;
        status: string;
        expDt: string;
    };
    assocDeptMaps: [
        {
            id: number,
            crtdBy: string,
            crtdDt: string,
            descr: string,
            effectiveDt: string,
            expDt: string,
            lkpAssocDeptId: number,
            propelRefId: number,
            status: number,
            updBy: string,
            updDt: string
        }
    ];
    assocTypeMaps: [
        {
            id: number,
            crtdBy: string,
            crtdDt: string,
            descr: string,
            effectiveDt: string,
            expDt: string,
            lkpAssocTypeId: number,
            status: 1,
            updBy: string,
            updDt: string
        }
    ];
    assocStaffs: [];


}