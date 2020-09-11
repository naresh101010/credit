import { ServiceList } from "./../Models/service-list";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ServiceListService {
    constructor(private http: HttpClient) { }

    getServiceLineList() {
        return this.http.get<ServiceList>(`sla/v1/mdm`).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.serviceLineList;
                }
                // return response.data.responseData;
            })
        );
    }

    getServicesOffering() {
        return this.http
            .get<ServiceList>(`sla/v1/mdm/serviceOfferings`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.serviceOfferingList;
                    }
                    // return response.data.serviceOfferingList;
                })
            );
    }

    servicesOfferingByRategroup(rateGroupId) {
        return this.http
            .get<ServiceList>(`sla/v1/mdm/${rateGroupId}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data;
                    }
                    // return response.data.serviceOfferingList;
                })
            );
    }
}
