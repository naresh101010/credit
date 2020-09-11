import { ZoneMatrix } from "./../Models/zone-matrix";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ZoneMatrixList } from "../Models/zone-matrix-list";

@Injectable({
    providedIn: "root"
})
export class ZoneMatrixService {
    constructor(private http: HttpClient) { }

    getAllZones() {
        return this.http.get<ZoneMatrix>(`zone-matrix/v1/mdm`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getLastUpdatedZones() {
        return this.http.get<ZoneMatrix>(`zone-matrix/v1/mdm/lastUpdated`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getZmLzRgMapping(zoneMatrixId) {
        
        return this.http.get<ZoneMatrix>(`zone-matrix/v1/mdm/zmLzRgMapping/${zoneMatrixId}`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getStateCode(zoneMatrixId) {
        
        return this.http.get<ZoneMatrix>(`zone-matrix/v1/mdm/stateCode/${zoneMatrixId}`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getZonesDetails(zoneId) {
        return this.http.get<ZoneMatrix>(`zone-matrix/v1/mdm/id/${zoneId}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    getZoneList() {
        return this.http.get<ZoneMatrixList>(`zone-matrix/list`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    zoneStateMap(data) {
        return this.http.post<any>(`zone-matrix/v1/mdm/stateCode`, data).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                } else {
                    return response.errors;
                }
            })
        );
    }

    zmLzRgMapping(data) {
        return this.http.post<any>(`zone-matrix/v1/mdm/zmLzRgMapping`, data).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                } else {
                    return response.errors;
                }
            })
        );
    }

    searchByName(zoneMatrixName) {
        return this.http
            .get<ZoneMatrix>(`zone-matrix/v1/mdm/${zoneMatrixName}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

    saveZoneMatrix(data: ZoneMatrix) {

        return this.http.post<ZoneMatrix>(`zone-matrix/v1/mdm`, data).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                } else {
                    return response.errors;
                }
            })
        );
    }

    getStateZone() {
        return this.http.get<ZoneMatrix>(`logistic-zone/v1/mdm/list/1`).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                }
            })
        );
    }
}
