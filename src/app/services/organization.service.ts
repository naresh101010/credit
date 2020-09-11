import { map } from 'rxjs/operators';
import { Organization } from './../Models/organization';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Organization>(`v1/geo/bff/org`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    getDetailsById(orgId) {
        return this.http.get<Organization>(`v1/geo/bff/org/${orgId}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    updateOrg(data) {
        return this.http.post<Organization>(`v1/geo/bff/org`, data).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

    addOrg(data) {
        return this.http.post<Organization>(`v1/geo/bff/org`, data).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    searchOrg(name) {
        return this.http.get<Organization>(`v1/geo/bff/org/search/${name}`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }
}
