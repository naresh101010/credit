// import { FuelPrice } from './../Models/fuel';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class GstService {
    constructor(private http: HttpClient) { }


    getAllGst() {
        return this.http.get<any>(`lookup/v1/mdm/gstType`).pipe(
            map((response: any) => {
                return response;
            })
        );
    }
    getGstByName(name) {
        return this.http.get<any>(`lookup/v1/mdm/gstName/${name}`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    saveGst(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/gstType`, data).pipe(
            map((response: any) => {
                if (response) {
                    return response;
                } else {
                    return response.errors;
                }
            })
        );
    }
    // putFuelGst(data: any) {
    //     return this.http.put<any>(`lookup/v1/mdm/gstType`, data).pipe(
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
            .get<any>(`lookup/v1/mdm/gstType/${name}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

}
