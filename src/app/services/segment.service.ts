import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class SegmentLineService {
    constructor(private http: HttpClient) { }

    getAllSegment() {
        return this.http.get<any>(`lookup/v1/mdm/segment/list`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getAllSubSegment(id) {
        return this.http.get<any>(`lookup/v1/mdm/subsegment/segmentId/${id}`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    saveSubSegment(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/subsegment`, data).pipe(
            map((response: any) => {
                if (response) {
                    return response;
                } else {
                    return response.errors;
                }
            })
        );
    }
    saveSegment(data: any) {
        return this.http.post<any>(`lookup/v1/mdm/segment`, data).pipe(
            map((response: any) => {
                if (response) {
                    return response;
                } else {
                    return response.errors;
                }
            })
        );
    }
    searchBySegmentName(name) {
        return this.http
            .get<any>(`lookup/v1/mdm/segment/${name}`)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }
    searchBySubSegmentName(segmentId,name) {
        return this.http
            .get<any>(`lookup/v1/mdm/subsegmentName/ ${segmentId}/`+ name)
            .pipe(
                map((response: any) => {
                    if (response.data) {
                        return response.data.responseData;
                    }
                })
            );
    }
      getLoadList() {
        return this.http.get<any>(`lookup/v1/mdm/load`).pipe(
            map((response: any) => {
                return response.data;
            })
        );
    }

}
