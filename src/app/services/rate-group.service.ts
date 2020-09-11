import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RateGroup } from "../Models/rate-group";

@Injectable({
    providedIn: "root"
})
export class RateGroupService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<RateGroup>(`rate-group/v1/mdm`).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                }
            })
        );
    }

    getLastUpdated() {
        return this.http.get<RateGroup>(`rate-group/v1/mdm/lastUpdated`).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                }
            })
        );
    }

    getMatrixId(zoneMatrixId) {
        return this.http
            .get<RateGroup>(`rate-group/v1/mdm/list/?zoneMatrixId=${zoneMatrixId}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

    getValidRateGroups() {
        return this.http
            .get<RateGroup>(`rate-group/v1/mdm/list`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

    searchRateGroup(name) {
        return this.http.get<RateGroup>(`rate-group/v1/mdm/${name}`).pipe(
            map((response: any) => {
                if (response.data) {
                    if (response.data) {
                        return response.data.responseData;
                    }
                }
            })
        );
    }

    saveGroup(data) {
        return this.http.post<RateGroup>(`rate-group/v1/mdm`, data).pipe(
            map((response: any) => {
                if (response.data.responseData) {
                    if (response.data) {
                        return response.data.responseData;
                    }
                }
                // return
            })
        );
    }
}
