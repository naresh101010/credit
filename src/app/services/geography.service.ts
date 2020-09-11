import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class GeographyService {
    constructor(private http: HttpClient) { }

    getLoadData() {
        return this.http.get<any>(`v1/geo/bff/load`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }
}
