import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Country } from "./../Models/country";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CountryService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`v1/geo/bff/country`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    getDetailsById(countryId) {
        return this.http.get(`v1/geo/bff/country/id/${countryId}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    saveDetails(data) {
        return this.http.post(`v1/geo/bff/country`, data).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }
}
