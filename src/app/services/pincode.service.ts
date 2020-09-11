import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PincodeService {

    constructor(private http: HttpClient) { }

    getByCityId(cityid) {
        return this.http.get<any>(`v1/geo/bff/pincodelist/${cityid}`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getAll() {
        return this.http.get<any>(`v1/geo/bff/pincode`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    savePincode(data){
        return this.http.post<any>(`v1/geo/bff/pincode`,data).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getPincodeById(pincodeId){
        return this.http.get<any>(`v1/geo/bff/pincode/id/${pincodeId}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    searchPincode(pincode){
        return this.http.get<any>(`v1/geo/bff/pincode/${pincode}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

}
