import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class AddressFeatureMasterService {
    constructor(private http: HttpClient) { }

    getAddressFeature() {
        return this.http.get<any>(`lookup/v1/mdm/feature`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    saveAddressFeature(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/feature`, data).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                } else {
                    return response.errors;
                }
            })
        );
    }
    // putAddressFeature(data: any) {
    //     return this.http.put<any>(`lookup/v1/mdm/addrFeature`, data).pipe(
    //         map((response: any) => {
    //             if (response.data) {
    //                 return response.data.responseData;
    //             } else {
    //                 return response.errors;
    //             }
    //         })
    //     );
    // }

    searchByName(name) {
        return this.http
            .get<any>(`lookup/v1/mdm/feature/${name}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }
}


