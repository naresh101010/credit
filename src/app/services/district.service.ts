import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`v1/geo/bff/district`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getDetailsById(districtId) {
        return this.http.get<any>(`v1/geo/bff/district/id/${districtId}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    getByStateId(stateid) {
        return this.http.get<any>(`v1/geo/bff/districtlist/${stateid}`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    saveDistrict(data) {
        return this.http.post<any>(`v1/geo/bff/district`, data).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

}
