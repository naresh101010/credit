import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  getHeader() {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
    const headerData = {
      'branchId': sessionStorage.getItem('branchId'),
      'userId': userDetails.userId,
      'authorization': userDetails.token
    }
    return new HttpHeaders(headerData);
  }
}
