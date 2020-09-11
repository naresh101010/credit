import { lookUp } from "./../Models/lookup";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class LookUpServices {
    constructor(private http: HttpClient) { }

    searchByName(name) {
        return this.http
            .get<any>(`lookup/v1/mdm/lookupType/${name}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

    getLookup() {
        return this.http.get<any>(`lookup/v1/mdm/lookupTypeList`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getLookupValueByType(lookupType) {
        return this.http.get<any>(`lookup/v1/mdm/lookupValue/list/lookupType/${lookupType}`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    saveLookupType(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/lookupType`, data).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }
    saveLookupValue(data: any) {

        return this.http.post<any>(`lookup/v1/mdm/lookupValue`, data).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getLoadList() {
        return this.http.get<any>(`lookup/v1/mdm/load`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }


}
