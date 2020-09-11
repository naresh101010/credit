import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { State } from '../Models/state';

@Injectable({
    providedIn: "root"
})
export class StateService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<State>(`v1/geo/bff/state`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    
    getByCountryId(countryid) {
        return this.http.get<any>(`v1/geo/bff/statelist/${countryid}`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    saveState(data) {
        return this.http.post<State>(`v1/geo/bff/state`, data).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getDetailsById(stateId) {
        return this.http.get(`v1/geo/bff/state/id/${stateId}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }
}
