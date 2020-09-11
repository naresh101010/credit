import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class FuelPriceService {
    constructor(private http: HttpClient) { }


    getAllFuelPrice() {
        return this.http.get<any>(`lookup/v1/mdm/fuelPrice`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    saveFuelPrice(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/fuelPrice`, data).pipe(
            map((response: any) => {
                if (response) {
                    return response;
                } else {
                    return response.errors;
                }
            })
        );
    }
    getFuelIndexByfuelType(fuelIndex) {

        return this.http.get<any>(`lookup/v1/mdm/fuelPrice/list/fuelIndex/` + fuelIndex).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    getMetroMapList() {
        return this.http.get<any>(`lookup/v1/mdm/fuel/cities/mapping`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    getMetroMapLoad() {
        return this.http.get<any>(`lookup/v1/mdm/fuel/cities/mapping/load`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    getMetroMapById(lkpFuelIndexId) {
        return this.http.get<any>(`lookup/v1/mdm/fuel/cities/mapping/${lkpFuelIndexId}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    submitMetroMap(data) {
        return this.http.post<any>(`lookup/v1/mdm/fuel/cities/mapping`, data).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    updateMetroMap(data) {
        return this.http.put<any>(`lookup/v1/mdm/fuel/cities/mapping`, data).pipe(
            map((response: any) => {
                return response.data;
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