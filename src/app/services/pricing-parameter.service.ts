import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class PricingParameter {
    constructor(private http: HttpClient) { }

    getall() {
        
        return this.http.get<any>(`v1/priceparameter/bff/priceParemeterList`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }
    getLoad() {
        
        return this.http.get<any>(`v1/priceparameter/bff/load`).pipe(
            map((response: any) => {
                return response.data.referenceData;
            })
        );
    }
   getPricingParameterById(priceparameterId) {
        return this.http.get<any>('v1/priceparameter/bff/priceParemeters/' + priceparameterId).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        )
    }
    savepricing(data: any) {
        return this.http.post<any>(`v1/priceparameter/bff/priceParemeters`, data).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                } else {
                    return response.errors;
                }
            })
        );
    }

    searchByName(priceparameterName) {
        return this.http
            .get<any>(`v1/priceparameter/bff/priceParemeters/name/${priceparameterName}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }
}


