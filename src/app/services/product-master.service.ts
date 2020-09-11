import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ProdMasterService {
    constructor(private http: HttpClient) { }

    getLoad() {
        return this.http.get<any>(`lookup/v1/mdm/load`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getAllProdMaster() {
        return this.http.get<any>(`lookup/v1/mdm/product`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        )
    }

    getAllProdCategory() {
        return this.http.get<any>(`lookup/v1/mdm/productCategory/list`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }
getProductById(id){
    return this.http.get<any>(`lookup/v1/mdm/product/list/productCategoryId/${id}`).pipe(
        map((response: any) => {
            return response.data;
        })
    );
}
    getAllHsnCode() {
        return this.http.get<any>(`lookup/v1/mdm/hsncode`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    saveProdMaster(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/product`, data).pipe(
            map((response: any) => {
                if (response) {
                    return response;
                } else {
                    return response.errors;
                }
            })
        );
    }

    saveProdCategory(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/productCategory`, data).pipe(
            map((response: any) => {
                if (response) {
                    return response;
                } else {
                    return response.errors;
                }
            })
        );
    }

    saveHsnCode(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/hsncode`, data).pipe(
            map((response: any) => {
                if (response) {
                    return response.data;
                } else {
                    return response.errors;
                }
            })
        );
    }
    
    searchByProductName(name) {
        return this.http
            .get<any>(`lookup/v1/mdm/product/${name}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }
    searchByProductCategoryName(name) {
        return this.http
            .get<any>(`lookup/v1/mdm/productCategory/name/${name}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }

}
