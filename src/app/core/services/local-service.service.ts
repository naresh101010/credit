import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalServiceService {
  schCommercialId = null;
  safCommercialId = null;
  constructor() { }

  setSchCommercialId(id: number) {
    this.schCommercialId = null;
    this.schCommercialId = id;
  }
  getSchCommercialId() {
    return this.schCommercialId;
  }
  setSafCommercialId(id: number) {
    this.safCommercialId = null;
    this.safCommercialId = id;
  }
  getSafCommercialId() {
    return this.safCommercialId;
  }
}
