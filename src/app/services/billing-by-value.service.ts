// import { FuelPrice } from './../Models/fuel';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class BillingByValue {
    constructor(private http: HttpClient) { }

    getBillingByLevelMaster() {
        return this.http.get<any>(`lookup/v1/mdm/billing-by-level-map`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }
    saveBillingByLevelMaster(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/billing-by-level-map`, data).pipe(
            map((response: any) => {
                if (response) {
                    return response.data.responseData;
                } else {
                    return response.errors;
                }
            })
        );
    }
    // putBillingByLevelMaster(data: any) {
    //     return this.http.put<any>(`lookup/v1/mdm/billing-by-level-map`, data).pipe(
    //         map((response: any) => {
    //             if (response) {
    //                 return response;
    //             } else {
    //                 return response.errors;
    //             }
    //         })
    //     );
    // }
    searchByName(name) {
        return this.http
            .get<any>(`lookup/v1/mdm/billing-by-level-map/${name}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

}
