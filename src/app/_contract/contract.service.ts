import { throwError as observableThrowError, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppSetting } from '../app.setting';
import { MSA } from './../_contract/models/msa';


@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private _url: any = "assets/json/dashboard.json";
  constructor(private http: HttpClient) { }
  headerData = {
    'branchCode': '02',
    'journeyId': 'PRC_CNTR',
    'originUserType': '03',
    'userId': 'user123'
  }
  // Dashboard
  getData(status){
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/msa/status/${status}`, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }  
  contractCount(){
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/contract/contractCount", { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }
  // for  MSA 
  private _urlmsa: any = "assets/json/msa.json";
  getMsa(msaCustId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/msa/${msaCustId}`, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }
  getCity(pincode) {

    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/geography/pincode/${pincode}`, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }
  putMsa(val) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.put<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/msa/", val, { headers: headers }).pipe(
      catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
  }
  // for oportunity
  getOportunity(data, isEdit) {

    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract-stg/v1/opportunity/${data}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/opportunity/${data}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }
  postOportunity(data, isEdit, isTermination) {

    var headers = new HttpHeaders(this.headerData);
    if (isTermination) {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/contract/", data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      if (isEdit) {
        return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/contract/", data, { headers: headers }).pipe(catchError((error: Response) => {
          return observableThrowError("Something went wrong");
        }));
      }
      else {
        return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/contract/", data, { headers: headers }).pipe(catchError((error: Response) => {
          return observableThrowError("Something went wrong");
        }));
      }
    }
  }

  //for services
  getServices(contrctId, isEdit) {

    var val1 = contrctId
    let params = new HttpParams();
    params = params.append('contractId', val1);
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/services/", { headers: headers, params: params }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
    else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/services/", { headers: headers, params: params }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }
  getServiceOfering(data) {

    var val1 = data
  
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/services/service-offering/service-line/${val1}`, { headers: headers }).pipe(
      catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
  }

  postServices(data, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/services/", data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
    else {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/services/", data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }


  //for rate card
  //rate card details

  getRateCardDetail(contractId, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract-stg/v1/rate-card/contract/${contractId}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/rate-card/contract/${contractId}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }

  postRateCardDetail(data, isEdit) {

    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/rate-card/", data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/rate-card/", data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }
  putRateCardDetail(data, isEdit) {

    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.put<any>(AppSetting.API_ENDPOINT + `secure/prc-contract-stg/v1/rate-card/deactivate/ratecard/${data.id}/contract/${data.cntrId}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.put<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/rate-card/deactivate/${data.id}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }

  //Commercial Details

  getCommercialDetail(data, isEdit) {

    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/commercial/rate-card/" + data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/commercial/rate-card/" + data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }

  productListData(data) {

    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/rate-card/product/" + data, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }


  getAddrByState() {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/geography/state", { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }
  getAddrByCity() {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/geography/city", { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }
  getAddrByDistrict() {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/geography/district", { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }

  getAddrByPincode(pincode) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/geography/pincode/${pincode}`, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }

  getSfxViewFromId(sfxId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/geography/safe-extention/${sfxId}`, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  deleteCommercialDetailbyId(id, isEdit, contractId) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.put<any>(AppSetting.API_ENDPOINT + `secure/prc-contract-stg/v1/commercial/deactivate/${id}/contract/${contractId}`, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    } else {
      return this.http.put<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/commercial/deactivate/${id}`, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    }
  }
  //Commercial by Id
  getCommercialDetailbyId(data, data1, data2, isEdit) {

    let params = new HttpParams();
    if (data) {
      params = params.append('id', data);
    }
    params = params.append('serviceOfferingId', data1);
    params = params.append('zoneMatrixId', data2);
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/commercial/", { headers: headers, params: params }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/commercial/", { headers: headers, params: params }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }
  postCommercialDetail(data, isEdit,isCopyCmdmnt,oldCommerId,isCopyRateCard) {

    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      if(isCopyCmdmnt && isCopyRateCard){
        return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/commercial/?contractId=" + data.contractId+"&isCopyCmdmnt=true&oldCommerId="+oldCommerId, data, { headers: headers }).pipe(catchError((error: Response) => {
          return observableThrowError("Something went wrong");
        }));
      }else{
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/commercial/?contractId=" + data.contractId, data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } }else {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/commercial/", data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }
  
  //commandment details
  getCommandmentDetail(level, entityId, serviceOfferingId, businessTypeId, customerTypeId, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    var url = "";
    if (isEdit) {
      url = AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/commandment/offering/" + serviceOfferingId + "/" + customerTypeId + "/" + businessTypeId;
      if (entityId && entityId > 0 && level && level != "") {
        url = url + "?entityId=" + entityId + "&level=" + level;
      }
    } else {
      url = AppSetting.API_ENDPOINT + "secure/prc-contract/v1/commandment/offering/" + serviceOfferingId + "/" + customerTypeId + "/" + businessTypeId;
      if (entityId && entityId > 0 && level && level != "") {
        url = url + "?entityId=" + entityId + "&level=" + level;
      }
    }
    return this.http.get<any>(url, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }

  //ratecarddetail_offeringId
  getratecarddetail_offeringId() {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>("assets/json/commandment_detail.json", { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }

  //tnc

  getTncdetail(pRateCardId, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/tnc/?id=" + pRateCardId, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/tnc/?id=" + pRateCardId, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    }
  }
  postTncdetail(data, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/tnc?contractId=" + data.contractId, data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    } else {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/tnc/", data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    }
  }

  /**
   * Get the fuel price based on three parameters 
   *  */

  getFuelPrice(fuelIndex, fuelType) {
    var headers = new HttpHeaders(this.headerData);
    // return this.http.get<MSA[]>("assets/json/fueldatelookup.json", {headers:headers}).catch((error: Response) => {
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/rate-card/fuel?fuelIndex=" + fuelIndex + "&fuelType=" + fuelType, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  //tnc ends here          

  //Branch detail
  getBranch() {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>("assets/json/commandment_detail.json", { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }

  postBranch(data, isEdit, contractId) {

    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/branch?contractId=" + contractId, data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/branch/", data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }
  //Billing data

  getBillingData(cntrId, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/billing/contract/" + cntrId, { headers: headers }).catch((error: Response) => {
        return observableThrowError("Something went wrong");
      });
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/billing/billing/" + cntrId, { headers: headers }).catch((error: Response) => {
        return observableThrowError("Something went wrong");
      });
    }
  }
  postBillingData(data, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/billing?contractId=" + data.cntrId, data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    } else {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/billing", data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    }
  }

  deactivateOldBilling(data, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.put<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/billing/deactivate", data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    } else {
      return this.http.put<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/billing/deactivate", data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    }
  }

  getCneeCnorData(msaCustId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/msa/cneeCnor/msa/" + msaCustId, { headers: headers }).catch((error: Response) => {
      return observableThrowError("Something went wrong");
    });
  }

  searchBranch(branchName: string, hubFlag: boolean) {
    var headers = new HttpHeaders(this.headerData);
    var url = AppSetting.API_ENDPOINT + "secure/prc-contract/v1/branch/mdm/" + branchName;
    if (hubFlag)
      url = url + "/?feature=HUB";
    return this.http.get<any>(url, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getAssignBranchDetail(ratecardId, type, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
        return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract-stg/v1/branch/entity?entityId=${ratecardId}&entityType=${type}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/branch/entity?entityId=${ratecardId}&entityType=${type}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }

  getAssignBranchDetailByCntr(contractId, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract-stg/v1/branch/contract/` + contractId, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/branch/contract/` + contractId, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }

  getSubsefmentBySegmentId(segmentId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/opportunity/subsegment/segment/" + segmentId, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }

  getVMIById(msaId, rateCardId, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/vmi?msaId=" + msaId + "&rateCardId=" + rateCardId, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/vmi/?msaId=" + msaId + "&rateCardId=" + rateCardId, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    }
  }

  saveVMI(data, isEdit, contractId) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/vmi/?contractId=" + contractId, data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    } else {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/vmi/", data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    }
  }

  searchBranchByName(name) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/branch/mdm/" + name, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }
 
  searchAddressByName(addr1) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/msa/cneeCnor/addrBook/" + addr1, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }

  //==============MSA AND OPPORTUNITY SERVICE CALLS================
 
  getMSASearch(searchModel) {
    console.log(searchModel);
    var headers = new HttpHeaders(this.headerData);
    //return this.http.get<any>("assets/json/msasearchresult.json", {headers:headers}).catch((error: Response) => {
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/msa/msaSearch", searchModel, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong in msa search");
    });
  }

  getMSAReferences() {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/msa/msaSearch/", { headers: headers }).catch((error: Response) => {
      //return this.http.get<any>("assets/json/msaReferences.json", {headers:headers}).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  //this call is used to create a new MSA in propeli application
  postMSAPropeli(MSAData) {
    var headers = new HttpHeaders(this.headerData);
    //return this.http.get<any>("assets/json/msacreateresponse.json", {headers:headers}).pipe(catchError((error: Response) => {
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/msa/propeli", MSAData, { headers: headers }).pipe(catchError((error: Response) => {
      //console.log("error returned",error);
      return observableThrowError(error);
    }));

  }
  //this call is used to create a new MSA in propeli application
  postOpportunityPropeli(OppData) {
    var headers = new HttpHeaders(this.headerData);
    //return this.http.get<any>("assets/json/msacreateresponse.json", {headers:headers}).pipe(catchError((error: Response) => {
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/opportunity/", OppData, { headers: headers }).pipe(catchError((error: Response) => {
      //console.log("error returned",error);
      return observableThrowError(error);
    }));

  }

  getAllStates() {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/geography/state", { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getAllCountry() {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/geography/country", { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getStatesByPinFeatureId(pinFeatureId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/geography/state?pincodeFeatureId=" + pinFeatureId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  putDeactivateCneeCor(val): Observable<MSA[]> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.put<MSA[]>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/msa/cneeCnor", val, { headers: headers }).pipe(
      catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
  }


  /**
   * Function added for document upload
   */

  postSearchDocuments(data): Observable<MSA[]> {

    var headers = new HttpHeaders(this.headerData);
    return this.http.post<MSA[]>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/document/search", data, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });

  }

  getSubDocTypeData(id) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/document/subtype/" + id, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  postDocumentUploadDetail(data, file): Observable<MSA[]> {
    console.log("postDocumentUploadDetail");
    var headers = new HttpHeaders(this.headerData);
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('fileData', data);
    formData.append('file', file);
    return this.http.post<MSA[]>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/document/upload", formData, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

   getSLAById(rateCardId, zoneMatrixId, serviceOfferingId, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/sla/?rateCardId=" + rateCardId + "&zoneMatrixId=" + zoneMatrixId + "&serviceOfferingId=" + serviceOfferingId, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/sla/?rateCardId=" + rateCardId + "&zoneMatrixId=" + zoneMatrixId + "&serviceOfferingId=" + serviceOfferingId, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }

  saveSLA(data, isEdit, contractId) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/sla?contractId=" + contractId, data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/sla/", data, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }

  getPreview(contractId, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract-stg/v1/preview/preview/${contractId}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/preview/${contractId}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }

  generateSFXCode(contractId, isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.put<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/contract/", contractId, { headers: headers }).pipe(
        catchError((error: Response) => {
          return observableThrowError("Something went wrong");
        }));
    } else {
      return this.http.put<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/contract/", contractId, { headers: headers }).pipe(
        catchError((error: Response) => {
          return observableThrowError("Something went wrong");
        }));
    }

  }


  postBulkUploadConsignee(msaId, moduleEntityId, file): Observable<any> {

    var headers = new HttpHeaders(this.headerData);
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('msaId', msaId);
    formData.append('moduleEntityId', moduleEntityId);
    formData.append('file', file);
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/msa/cneeCnor/bulk-upload/upload", formData, { responseType: 'blob' as 'json', headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getPincodeByFeature(stateId, cityId, geoFeatureId) {
    var headers = new HttpHeaders(this.headerData);
    var baseUrl = AppSetting.API_ENDPOINT + "secure/prc-contract/v1/geography/pincode/feature/" + geoFeatureId;
    if (stateId && stateId > 0 && !cityId) {
      baseUrl = baseUrl + "?stateId=" + stateId;
    }
    if (cityId && cityId > 0) {
      baseUrl = baseUrl + "?stateId=" + stateId + "&cityId=" + cityId;
    }

    return this.http.get<any>(baseUrl,
      { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
  }

  getCityByStateService(stateId): Observable<any> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any[]>(AppSetting.API_ENDPOINT + 'secure/prc-contract/v1/geography/city/state/' + stateId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getStateByCountryId(countryId): Observable<any> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any[]>(AppSetting.API_ENDPOINT + 'secure/prc-contract/v1/geography/state/country/' + countryId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getCityByStateNPinFeatureId(stateId,featureId): Observable<any> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any[]>(AppSetting.API_ENDPOINT + 'secure/prc-contract/v1/geography/city/state/'+ stateId+'?pincodeFeatureId=' +featureId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  saveCommandment(data,isEdit) {
    var headers = new HttpHeaders(this.headerData);
    if(isEdit){
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract-stg/v1/commandment/?contractId=" + data.contractId, data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    }else{
      return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/commandment/", data, { headers: headers }).catch((error: Response) => {
        return Observable.throw("Something went wrong");
      });
    }

  }

  getPlaceByCityService(cityId): Observable<any> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/geography/pincode/city/" + cityId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });

  }

  /*end of pincode search*/

  getSfxCodeByMSAId(msaId): Observable<any> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/contract/msa/" + msaId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getSfxCodeSFXId(id): Observable<any> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/contract/searchContract/" + id, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getContractVersions(contractId): Observable<any> {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/contract/version/" + contractId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getHistoryPreviewContractVersion(contractId,version) {
    let params = new HttpParams();
    params = params.append('ver', version);
    var headers = new HttpHeaders(this.headerData);
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/history/${contractId}`, { headers: headers, params: params }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
  
  }

  getStatesByFeature(geoFeatureId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/geography/state??featureId=" + geoFeatureId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  serviceAssignOppCntr(data){
    var headers = new HttpHeaders(this.headerData);
    return this.http.put<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/opportunity/?cntrId=" + data.id + "&opporId=" + data.opportunityId, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }
  
  validateContract(contractId,isEdit){
    var headers = new HttpHeaders(this.headerData);
    if (isEdit) {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract-stg/v1/contract/validate/${contractId}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    } else {
      return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/contract/validate/${contractId}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
    }
  }

  getEditPreview(contractId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract-stg/v1/preview/edit/${contractId}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
    }));
    
  }

  getCmdDownloadDoc(){
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/commandment/download`, { responseType: 'blob' as 'json', headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  postCmdUploadDoc(msaId, moduleEntityId, file): Observable<any> {

    var headers = new HttpHeaders(this.headerData);
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/prc-contract/v1/commandment/upload/msa/"+msaId+"/?moduleEntityId="+moduleEntityId, formData, { responseType: 'blob' as 'json', headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

  getPRCContractByMSAId (msaId) {
    let headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT + `secure/prc-contract/v1/contract/prccrc/contract/${msaId}`, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
    }));
  }

  sendEmail(file,data){
    var headers = new HttpHeaders(this.headerData);
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('emailData', data);
    formData.append('file', file,"preview.pdf");
    return this.http.post<any>(AppSetting.API_ENDPOINT + "/secure/prc-contract/v1/document/email", formData, { headers: headers }).catch((error: Response) => {
      return Observable.throw("Something went wrong");
    });
  }

   // get module card details
   getCardDetails(menuHierarchyId) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.get<any>(AppSetting.API_ENDPOINT_UM +"/secure/v1/dashboard/moduleCardDetails/"+ menuHierarchyId, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }
  // post drag and drop data
  postDragDropData(data) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.post<any>(AppSetting.API_ENDPOINT_UM + "/secure/v1/dashboard/bookmark",data, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }

   // get dragged data, feature data
   getDragDropData(menuHierarchyId) {
      var headers = new HttpHeaders(this.headerData);
      return this.http.get<any>(AppSetting.API_ENDPOINT_UM + "/secure/v1/dashboard/bookmark/"+ menuHierarchyId, { headers: headers }).pipe(catchError((error: Response) => {
        return observableThrowError("Something went wrong");
      }));
   }


}