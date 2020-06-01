import { Lookup } from './billingModel';
import { FormControl } from '@angular/forms';
export class CommandmentResult {
    responseData: Commandment[]  = [];
    referenceData: ReferenceData;
}

export class Commandment {
    id: number;
    cmdmntLevel: string;
    cmdmntId: number;
    entityId: number;
    applicableFlag: number;
    rrFlag: number;
    lkpCalcTypeId: number;
    defaultLkpCalcTypeId: number
    lkpCalcMeasureId: number;
    defaultLkpCalcMeasureId: number;
    lkpCalcUnitId: number;
    defaultLkpCalcUnitId: number;
    lkpChrgOnId: number;
    cmdntChrgOnId: number
    defaultLkpChrgOnId: number
    minFrieghtFlg: number
    price: number;
    defaultPrice: number;
    minVal: number;
    defaultMinVal: number;
    maxVal: number;
    defaultMaxVal: number;
    minCalcFlag: number;
    geoCustomChrgFlag: number;
    cmdmntSlabCharge: CommandmentSlabChargeDTO[] = [];
    defaultCmdmntSlabCharge: CommandmentSlabChargeDTO[] = [];
    cmdmntGeoExclusion: CommdtGeoExclusionDTO[] = [];
    cmdmntGeoWiseCharge: CmdmntGeoWiseChargeDTO[] = [];
    cmdmntName: string;
    geoFeatureName: string;
    geoFeatureId: number;
    geoTypeName: string;
    calcTypeList: Lookup[];
    calcMeasureList: Lookup[];
    calcUnitList: Lookup[];
    chargesOnList: Lookup[];
    rrValueList: Radio[];
    fieldDisabled: boolean;
    def
}

export class CommandmentSlabChargeDTO {
    descr: string;
    id: number;
    price: number = 0;
    slabFrom: number = 0;
    slabTo: number = 0;
    version: number;
    status: number;
}

export class CommdtGeoExclusionDTO {
    descr: string;
    effectiveDate: Date;
    expiryDate: Date;
    id: number;
    pincodeId: number;
    recIdentifier: number;
    version: number;
    isChecked: boolean;
    pincode: string;
    city: string;
    status: number;
}

export class CmdmntGeoWiseChargeDTO {
    cmdmntGeoLevel: string;
    descr: string = "";
    effectiveDt: Date = new Date();
    expDt: Date = new Date();
    stateId: number;
    cityId: number = 0;
    surchargeType: number;
    id: number;
    price: number = 0;
    status: number;
    selectedCityList: number[] = [];
    cityCntrl: FormControl = new FormControl();
    cityList: Lookup[] = [];
    stateList: Lookup[] = [];

    constructor(cmdmntGeoCharge: any = {}) {
        this.cmdmntGeoLevel = "";
        this.descr = "";
        this.effectiveDt = new Date();
        this.expDt = null;
        this.stateId = null;
        this.cityId = null;
        this.price = null;
        this.status = null;
        this.selectedCityList = [];
        this.cityCntrl = new FormControl();
        this.cityList = [];
        this.stateList = [];
        this.id = null;;
    }
}

export class ReferenceData {
    commandmentCategoryList: Lookup[];
    commandmentTypeList: Lookup[];
    calculationTypeList: Lookup[];
    calculationMeasureList: Lookup[];
    calculationUnitList: Lookup[];
    cmdmntChargesOnList: Lookup[];
    cmdmntGeoTypeList: Lookup[];
    cmdmntMDMReference: CommandmentRef[];
    statusList: Lookup[];
}

export class CommandmentRef {
    id: number;
    commandmentName: string;
    rrFlag: number;
    minAmountFlag: number;
    maxAmountFlag: number;
    commandmentOrder: number;
    serviceOfferingId: number;
    customerTypeId: number;
    commandmentCategoryId: number;
    commandmentTypeId: number;
    calculationTypeId: string;
    calculationMeasureId: string;
    calculationUnitId: string;
    geoFeatureId: number;
    geoFeatureName: string;
    cmdmntRrsList: CommandmentRrResponseDTO[];
    calcTypeList: Lookup[];
    calcMeasureList: Lookup[];
    calcUnitList: Lookup[];
    chargesOnList: Lookup[];
    geoType: Lookup[];
}

export class CommandmentRrResponseDTO {
    id: number;
    calculationMeasureId: number;
    calculationUnitId: number;
    rrValue: number;
    cmdmntRrSlabList: CommandmentRrSlabList[];
    calculationTypeId: number;
    minValue: number
    maxValue: number
    cmdntChrgOnId: number
    minFrieghtFlg: number
}

export class CommandmentRrSlabList {
    id: number;
    cmdmntRrId: number;
    slabFrom: number;
    slabTo: number;
    rrValue: number;
}

export class Radio {
    id: number;
    value: string;
}