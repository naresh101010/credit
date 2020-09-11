import { LogisticZone } from "./../Models/logistic-zone";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class LogisticZoneService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<LogisticZone>(`logistic-zone/v1/mdm`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getLastUpdated() {
        return this.http.get<LogisticZone>(`logistic-zone/v1/mdm/lastUpdated`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getCountry() {
        return this.http.get<LogisticZone>(`logistic-zone/v1/mdm/country`).pipe(
            map((response: any) => {
                return response.data.countryList;
            })
        );
    }

    getStates(countryId) {
        return this.http
            .get<LogisticZone>(`logistic-zone/v1/mdm/statelist/${countryId}`)
            .pipe(
                map((response: any) => {
                    return response.data.stateList;
                })
            );
    }

    getValidLogisticList() {
        return this.http
            .get<Array<LogisticZone>>(`logistic-zone/v1/mdm/list`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

    getZoneMatrixList(zoneMatrixId) {
        return this.http
            .get<Array<LogisticZone>>(`logistic-zone/v1/mdm/list/${zoneMatrixId}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

    searchByName(logisticName) {
        return this.http
            .get<Array<LogisticZone>>(`logistic-zone/v1/mdm/${logisticName}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

    saveLogistic(data: LogisticZone) {
        return this.http.post<LogisticZone>(`logistic-zone/v1/mdm`, data).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                }
            })
        );
    }

    updateLogistic(data: LogisticZone) {
        return this.http.put<LogisticZone>(`logistic-zone/v1/mdm`, data).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                }
            })
        );
    }
}
