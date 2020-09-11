import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class CommandantService {
    constructor(private http: HttpClient) { }


    getAll() {
        return this.http.get<any>('v1/bff/commandments').pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getLoad() {
        return this.http.get<any>('v1/bff/commandments/load').pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    SearchCommandment(cmdName) {
        return this.http.get<any>('v1/bff/commandments/name/' + cmdName).pipe(
            map((response: any) => {
                if(response){
                    return response.data;
                }
                else{
                    return response.errors;
                }
            })
        );
    }

    getCommandantLoad() {
        return this.http.get<any>('v1/bff/commandments/load').pipe(
            map((response: any) => {
                return response.data.referenceData;
                // return response.data.responseData;
            })
        );
    }

    getCommandantRrValue(id) {
        return this.http.get<any>('v1/bff/commandment/rr/' + id).pipe(
            map((response: any) => {
                return response.data;
            })
        )
    }
    getCommandantRecent() {
        return this.http.get<any>('v1/bff/commandments/recent').pipe(
            map((response: any) => {
                return response.data;
            })
        )
    }
    getcommandantById(commandmentId) {
        return this.http.get<any>('v1/bff/commandments/' + commandmentId).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        )
    }
    getCommandantByServiceOfferId(serviceOfferingId) {
        return this.http.get('v1/bff/commandment/' + serviceOfferingId).pipe(
            map((response: any) => {
                return response.data;
            })
        )
    }
    saveCommandant(data) {
        
        return this.http.post<any>(`v1/bff/commandment`, data).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }
    saveCommandantRR(data) {
        
        return this.http.post<any>(`v1/bff/commandment/rr`, data).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }



    // saveCommandantOrder(data) {
    //     return this.http.post<any>(`v1/bff/commandment/order`, data).pipe(
    //         map((response: any) => {
    //             if (response) {
    //                 return response;
    //             } else {
    //                 return response.errors;
    //             }
    //         })
    //     );
    // }

    // 0:
    // customerTypeId: 158
    // serviceOfferingId: 1
    // businessTypeId: 19
    // status: 1
    // commandmentRrRequestDTO:
    // calculationTypeId: 25
    // calculationUnitId: 26
    // calculationMeasureId: 22
    // rrValue: "fsfg"
    // maxValue: "fgfhg"
    // minFrieghtFlg: "ghjgh"
    // minValue: "1"
    // __proto__: Object
    // commandmentId: 734
    // id: 734
    // isChecked: true
    // __proto__: Object
    // length: 1
    // __proto__: Array(0)



}
