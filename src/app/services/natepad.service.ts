// import { notepad } from "../Models/notepad";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { notepadList } from "../Models/notepad-list";

@Injectable({
    providedIn: "root"
})
export class NotePadService {
    constructor(private http: HttpClient) { }

    getAllModule() {
        return this.http.get<any>(`notepad/v1/mdm/moduleList`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getAttributeType() {
        return this.http.get<any>(`notepad/v1/mdm/attributesTypes`).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getByModuleId(moduleId) {
        return this.http.get<any>(`notepad/v1/mdm/entityList/` + moduleId).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    getByModuleEntityId(moduleEntityId) {
        return this.http.get<any>(`notepad/v1/mdm/moduleEntityId/` + moduleEntityId).pipe(
            map((response: any) => {
                return response.data.responseData;
            })
        );
    }

    saveAllNotePad(data: any) {
        return this.http.post<any>(`notepad/v1/mdm`, data).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                } else {
                    return response.errors;
                }
            })
        );
    }
    updateNotepad(data: any) {
        return this.http.post<any>(`notepad/v1/mdm`, data).pipe(
            map((response: any) => {
                if (response.data) {
                    return response.data.responseData;
                } else {
                    return response.errors;
                }
            })
        );
    }
}


