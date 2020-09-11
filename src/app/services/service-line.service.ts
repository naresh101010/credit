import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ServiceLineService {
    constructor(private http: HttpClient) { }

    getServiceLineList() {
        return this.http.get<any>(`lookup/v1/mdm/serviceLineList`).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                }
            })
        );
    }
    getServiceLineOfferingList(serviceLineId) {
        return this.http.get<any>(`lookup/v1/mdm/serviceOffering/serviceLineId/${serviceLineId}`).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                }
            })
        );
    }

    saveServiceLine(data: any) {
        return this.http.post<any>('lookup/v1/mdm/serviceOffering', data).pipe(
            map((response: any) => {
                if (response) {
                    return response.data.responseData;
                } else {
                    return response.errors;
                }
            })
        );
    }

}
