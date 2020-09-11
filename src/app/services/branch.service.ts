import { FuelPrice } from '../Models/fuel';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class BranchService {
	constructor(private http: HttpClient) { }


	getAll() {
		return this.http.get<any>('v1/branches/').pipe(
			map((response: any) => {
				return response.data;
			})
		);
	}


	getBranchLoad() {
		return this.http.get<any>('v1/branches/load').pipe(
			map((response: any) => {
				return response.data;
			})
		);
	}
	getState() {
		return this.http.get<any>('v1/branches/states').pipe(
			map((response: any) => {
				return response.data.responseData;
			})
		);
	}
	getDistrictByState(stateId) {
		return this.http.get<any>(`v1/branches/districts/${stateId}`).pipe(
			map((response: any) => {
				return response.data.responseData;
			})
		);
	}
	getCityByDistrict(districtId) {
		return this.http.get<any>(`v1/branches/cities/${districtId}`).pipe(
			map((response: any) => {
				return response.data.responseData;
			})
		);
	}
	getPincodeByCity(cityId) {
		return this.http.get<any>(`v1/branches/pincodelist/${cityId}`).pipe(
			map((response: any) => {
				return response.data.responseData;
			})
		);
	}

	getBranchByDetails(branchcode) {
		return this.http.get<any>('v1/branches/branchCode/' + branchcode).pipe(
			map((response: any) => {
				return response.data;
			})
		)
	}

	searchEmploye(searchValue) {
		if (searchValue == ' ') {
			searchValue = '%20'
		}
		return this.http.get<any>(`v1/branches/users/${searchValue}`).pipe(
			map((response: any) => {
				return response.data;
			})
		)
	}

	getAllPincode() {
		return this.http.get<any>('v1/branches/pincodes').pipe(
			map((response: any) => {
				return response.data.responseData;
			})
		);
	}

	branchAdvanceSearch(searchCriteria, criteriaValue) {
		return this.http.get<any>(`v1/branches/${searchCriteria}/${criteriaValue}`).pipe(
			map((response: any) => {
				return response.data;
			})
		)
	}

	searchBranchByName(branchName) {
		return this.http.get<any>(`v1/branches/${branchName}`).pipe(
			map((response: any) => {
				return response.data;
			})
		)
	}

	getDetailsById(branchId) {
		return this.http.get<any>(`v1/branches/branchId/${branchId}`).pipe(
			map((response: any) => {
				return response.data;
			})
		)
	}

	submitSlab(data) {
		return this.http.post<any>('v1/branches/slabs', data).pipe(
			map((response: any) => {
				return response.data;
			})
		)
	}

	getBranchById(branchId) {
		return this.http.get('v1/branches/branchId/' + branchId).pipe(
			map((response: any) => {
				return response.data;
			})
		)
	}

	saveBranch(data) {
		return this.http.post<any>(`v1/branches/`, data).pipe(
			map((response: any) => {
				if (response) {
					return response;
				} else {
					return response.errors;
				}
			})
		);
	}

	saveBranchHierarchyDetails(data) {
		return this.http.post<any>(`v1/branches/branchHierarchyDetails`, data).pipe(
			map((response: any) => {
				if (response) {
					return response;
				} else {
					return response.errors;
				}
			})
		);
	}

	saveFeatures(data) {
		return this.http.post<any>(`v1/branches/features`, data).pipe(
			map((response: any) => {
				if (response) {
					return response;
				} else {
					return response.errors;
				}
			})
		);
	}

	getSearchBranchTypes() {
		return this.http.get<any>(`v1/branches/types`).pipe(
			map((response: any) => {
				if (response) {
					return response.data;
				} else {
					return response.errors;
				}
			})
		);
	}


	// branch Pin mapping

	getBranchLoadPinMapping() {
		return this.http.get<any>('v1/branches/load/pinmapping').pipe(
			map((response: any) => {
				return response.data;
			})
		);
	}

	getBranchPincodeMapping(searchValue) {
		return this.http.get<any>(`v1/branches/pincodemapping/search/${searchValue}`).pipe(
			map((response: any) => {
				return response.data;
			})
		);
	}


	savePincodeMapping(data) {
		return this.http.post<any>(`v1/branches/pincodemapping`, data).pipe(
			map((response: any) => {
				if (response) {
					return response.data.responseData;
				} else {
					return response.errors;
				}
			})
		);
	}

	getPinBranchDetails(branchType,branchId) {
		return this.http.get<any>(`v1/branches/pincodemapping/${branchType}/${branchId}`).pipe(
			map((response: any) => {
				if (response) {
					return response.data.responseData;
				} else {
					return response.errors;
				}
			})
		);
	}

	 searchPincode(pincode){
		
		return this.http.get<any>(`v1/branches/pincodelist/search/${pincode}`).pipe(
			map((response: any) => {
				if (response) {
					return response.data.responseData;
				} else {
					return response.errors;
				}
			})
		);
	}

	getBranchTypeByBranchId(branchTypeId){
		
		return this.http.get<any>(`v1/branches/branchType/${branchTypeId}`).pipe(
			map((response: any) => {
				if (response) {
					return response.data.responseData;
				} else {
					return response.errors;
				}
			})
		);
	}

	getPincodesByIds(pinArray){
		return this.http.post<any>(`/v1/branches/pincodelist`,pinArray).pipe(
			map((response: any) => {
				if (response) {
					return response.data.responseData;
				} else {
					return response.errors;
				}
			})
		);
	}
}
