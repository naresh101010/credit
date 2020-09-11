import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ProdCategory } from "./../Models/product-category";

@Injectable({
    providedIn: "root"
})
export class ProdCategoryService {
    constructor(private http: HttpClient) { }


    saveProdCategory(data: ProdCategory) {
        return this.http.post<ProdCategory>(`lookup/v1/mdm/productCategory`, data).pipe(
            map((response: any) => {
                if (response) {
                    return response;
                } else {
                    return response.errors;
                }
            })
        );
    }

}
