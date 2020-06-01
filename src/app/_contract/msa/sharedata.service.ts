import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    testvar:any
  private messageSource = new BehaviorSubject(this.testvar);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(sharedMSAData: any) {
    this.messageSource.next(sharedMSAData)
  }

}