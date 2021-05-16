import "rxjs/add/operator/catch";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSetting } from "src/app/app.setting";

@Injectable({
  providedIn: "root",
})
export class BookingInformationService {
  private _url: any = "assets/json/dashboard.json";
  constructor(private http: HttpClient) { }
  branchId = JSON.parse(sessionStorage.getItem("branchId"));
  userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  getLoad(branchId) {

    this.branchId = branchId
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/booking/lookups`)
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getBranchMop(branchId) {
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/branches/modeOfPayment/branchId/${branchId}
`
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getConsignorConsigneeById(id) {
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/cnor-cnee/${id}`
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  branchMannualOrAuto(branchId, headerData) {
    //  
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/getBranchType/${branchId}`, { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }
  async branchType(branchId, headerData) {
    console.log('branch id')
    //  
    var headers = new HttpHeaders(headerData);
    return await this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/getBranchType/${branchId}`, { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      ).toPromise();
  }
  getWaybillDetails(waybillId) {
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/waybill/waybillId/${waybillId}?fullDetail=true`)
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  getSfxCode(sfxCode, contractCode, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/contract/${contractCode}?brnchId=${this.branchId}&cntrCode=${sfxCode}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getPincodeIdByPincode(pincode, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/waybill/pincode/${pincode}`, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getPincodeByPincodeId(pincodeId, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/pincodeDetails/${pincodeId}`, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getCategory(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/product/productcategories`, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getAllProduct(headerData) {
    ;
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/product/productList`, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getPackage(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/booking/getPackagingTypeList`, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getProductCatId(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/product/productcategories`, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getServiceOffering(contractId, contractCode, headerData) {
    ;
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/offerings/${contractCode}/contract/${contractId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }
  getAllServiceOffering(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/waybill/offerings`, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getrateCardById(offeringId, contractCode, headerData) {
    ;
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/rateCard/${contractCode}/contract/${offeringId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getCommercialById(rateCardId, contractCode, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/commercials/${contractCode}/rateCard/${rateCardId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  getProductCategry(productCategoryId, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/product/productcategories/${productCategoryId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getProductCategoryByAlis(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/booking/getProductCategoryWithAlias`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getProductByCatId(productCategoryId, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT + `secure/v1/product/productList/${productCategoryId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getconsignerConsigneeByRateCardId(rateCardId, contractType, sfxCode, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/booking/contract/cnor-cnee/contractType/${contractType}?brnchId=${this.branchId}&cntrCode=${sfxCode}&consignType=CONSIGNOR&ratecardId=${rateCardId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  billableWeightFlag(contractType, rateCardId, headerData2) {
    var headers = new HttpHeaders(headerData2);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/branch/${contractType}/rateCard/${rateCardId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getConsigneeByMustCustId(msaCustId, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/booking/cnor-cnee/msaCustId/${msaCustId}?consignType=CONSIGNEE`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getConsignerByMustCustId(msaCustId, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/booking/cnor-cnee/msaCustId/${msaCustId}?consignType=CONSIGNOR`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getAllConrWithOutRateCard(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/booking/contract/cnor-cnee/branchId/${this.branchId}?consignType=CONSIGNOR`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getAllConrExistingWithOutRateCard(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/booking/contract/existingCnorCnee/branchId/${this.branchId}?consignType=CONSIGNEE`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getAllConsignorExistingWithOutRateCard(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/booking/contract/existingCnorCnee/branchId/${this.branchId}?consignType=CONSIGNOR`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getAllConeeWithOutRateCard(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/booking/contract/cnor-cnee/branchId/${this.branchId}?consignType=CONSIGNEE`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getAllConeeWithExisting(headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/cnor-cnee/branchId/${this.branchId}?consignType=CONSIGNEE`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  freightCharges(waybillId, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/freight-charges/waybillId/${waybillId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  updateReqNo(body, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/reScheduleBooking/updateRebookingRequestStatus`,
        body,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getConsignerList(rateCardId, contractCode, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/cnor/contract/${contractCode}/?brnchId=${this.branchId}&cntrCode=SFXT0012345&ratecardId=${rateCardId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  gettingRatecardByContract(contractCode, contractType, headerData2) {
    var headers = new HttpHeaders(headerData2);
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/ratecards/${contractType}?cntrCode=${contractCode}`, { headers: headers })
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  searchConsignerConsgnee(dto) {
    return this.http
      .post(AppSetting.API_ENDPOINT + `secure/v1/cnor-cnee/search`, dto)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  getConsineeDetail(consigneeId, offeringId) {
    return this.http.get(AppSetting.API_ENDPOINT + `secure/v1/contract/validate-consignee/` + consigneeId + `/getRateCardNCmrcl?serviceOfferingId=${offeringId}`).pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );
  }

  searchHub(hubName, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(AppSetting.API_ENDPOINT + `secure/v1/contract/hub/${hubName}`)
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  savePreBooking(wayBillDetailDTO) {
    var headerData = {
      branchCode: "02",
      journeyId: "01",
      originUserType: "03",
      branchId: JSON.stringify(this.branchId),
      userId: this.userDetails.userId,
    };
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/directBooking/booking-info`,
        wayBillDetailDTO,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );

  }
  saveBookingFirstStep(wayBillDetailDTO) {
    var headerData = {
      branchCode: "02",
      journeyId: "01",
      originUserType: "03",
      branchId: JSON.stringify(this.branchId),
      userId: this.userDetails.userId,
    };
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/directBooking/booking-info`,
        wayBillDetailDTO,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );

  }
  saveBookingSecondStep(wayBillDetailDTO) {
    var headerData = {
      branchCode: "02",
      journeyId: "01",
      originUserType: "03",
      branchId: JSON.stringify(this.branchId),
      userId: this.userDetails.userId,
    };
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/directBooking/consignor-consignee`,
        wayBillDetailDTO,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  saveBooking(wayBillDetailDTO) {
    var headerData = {
      branchCode: "02",
      journeyId: "01",
      originUserType: "03",
      branchId: JSON.stringify(this.branchId),
      userId: this.userDetails.userId,
    };
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/directBooking/waybill-directbooking`,
        wayBillDetailDTO,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  // saveConsignerConginee(directBookingDTO) {
  //      var  headerData = {
  //     'branchCode': '02',
  //     'journeyId': '01',
  //     'originUserType': '03',
  //     'branchId': JSON.stringify(this.branchId),
  //     'userId': this.userDetails.userId
  // }
  //     var headers = new HttpHeaders(headerData);
  //     return this.http.post(AppSetting.API_ENDPOINT + `v1/directBooking/consignor-consignee`, directBookingDTO, { headers: headers }).pipe(
  //         map((response: any) => {
  //             return response.data.responseData;
  //         })
  //     );
  // }
  // savePackagIng(directBookingDTO) {
  //      var  headerData = {
  //     'branchCode': '02',
  //     'journeyId': '01',
  //     'originUserType': '03',
  //     'branchId': JSON.stringify(this.branchId),
  //     'userId': this.userDetails.userId
  // }
  //     var headers = new HttpHeaders(headerData);
  //     return this.http.post(AppSetting.API_ENDPOINT + `v1/directBooking/invoice-packaging`, directBookingDTO, { headers: headers }).pipe(
  //         map((response: any) => {
  //             return response.data.responseData;
  //         })
  //     );
  // }
  generateBooking(waybillGenerateRequestDTO, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT + `secure/v1/waybill/generate`,
        waybillGenerateRequestDTO,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  calculateWaybillApi(waybillGenerateRequestDTO, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT + `secure/v1/waybill/calculateChargeFreight`,
        waybillGenerateRequestDTO,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  discount(discountbody, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT + `secure/v1/waybill/discount`,
        discountbody,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  saveconsigner(cnorCnee) {
    return this.http
      .post(AppSetting.API_ENDPOINT + `secure/v1/cnor-cnee `, cnorCnee)
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getWaybillById(ewaybillNumber) {
    ;
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/ewaybill-details/ewaybillNumber/${ewaybillNumber}`
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  gettingRatecardBserviceOffering(contractId , serviceOfferingId ,contractType ,headerData){
    var headers = new HttpHeaders(headerData);
    return this.http
    .get(
      AppSetting.API_ENDPOINT +
      `/secure/v1/rateCard/details/${contractType}?serviceOfferingId=${serviceOfferingId}$contractType=${contractId}` , { headers: headers }
    )
    .pipe(
      map((response: any) => {
        return response.data.responseData;
      })
    );
  }
  getWaybillByRequestId(waybillFilterRequestDTO, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/getWaybillByBookingReq`, waybillFilterRequestDTO,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  // WAY BILL CONTROLLER
  validateWaybillNumber(waybillNumber, headerData, manualBranchId) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/manualwaybill/validate/${waybillNumber}/${manualBranchId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  getWaybillDetailByWaybillId(waybillId, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/waybillId/${waybillId}?fullDetail=true`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getWaybillDetailByDate(fromDate, toDate, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/waybillByDate?fromDate=${fromDate}&toDate=${toDate}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getCommercialRatecardByalias(alias, categoryId, consigneeId, offeringId, packageId, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/booking/searchCommercials?alias=${alias}&branchId=${this.branchId}&cnorCneeId=${consigneeId}&offeringId=${offeringId}&packgTypeId=${packageId}&productCategoryId=${categoryId}
        `,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  getshipMenTrack(wyBillType, wyBillVal, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/waybill/shipment-tracking?searchType=${wyBillType}&searchValue=${wyBillVal}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getbranchDetail(branchList, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .post(
        AppSetting.API_ENDPOINT +
        `secure/v1/branchList`, branchList,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

  msaDetailByMsaName(custName, headerData, contractType, branchId) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/msa/search/${custName}?brnchId=${branchId}&contractType=${contractType}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }
  getContractByContractTypANDMsaId(contractType, msaId, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1/contracts/${contractType}/msaId/${msaId}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }



    getRatecardByContractWithoutBranch(contractId, serviceOfferingId, contractType, headerData2) {
      var headers = new HttpHeaders(headerData2);
      return this.http
        .get(AppSetting.API_ENDPOINT + `secure/v1/rateCard/details/${contractId}/${serviceOfferingId}/${contractType}`, { headers: headers })
        .pipe(
          map((response: any) => {
            return response.data.responseData;
          })
        );
    }


  getContractById(contractId, contractType, headerData) {
    var headers = new HttpHeaders(headerData);
    return this.http
      .get(
        AppSetting.API_ENDPOINT +
        `secure/v1//getContractSfx/details/${contractId}?contractType=${contractType}`,
        { headers: headers }
      )
      .pipe(
        map((response: any) => {
          return response.data.responseData;
        })
      );
  }

}
