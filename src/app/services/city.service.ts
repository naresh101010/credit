import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) { }

    getByDistrictId(districtid) { 
        return this.http.get<any>(`v1/geo/bff/citylist/${districtid}`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getAllCity() {
        return this.http.get<any>(`v1/geo/bff/city`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getDetailsById(cityId) {
        return this.http.get<any>(`/v1/geo/bff/city/id/${cityId}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    saveCity(data){
        return this.http.post<any>(`v1/geo/bff/city`,data).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }
  
}
