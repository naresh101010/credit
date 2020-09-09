import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

  testvar:any;
  mdata:any;
  displayDateFormat: string = 'dd-MM-yyyy';
  private messageSource = new BehaviorSubject(this.testvar);
  public msaLevel = new BehaviorSubject('');
  public retailCode = new BehaviorSubject('NOT GENERATED YET');
  public msaData = new BehaviorSubject(this.mdata);

  currentMessage = this.messageSource.asObservable();
  currentMSALevel = this.msaLevel.asObservable();
	currentRetailCode = this.retailCode.asObservable();
  currentMsaData= this.msaData.asObservable();

  constructor() { }

  changeMessage(sharedMSAData: any) {
    this.messageSource.next(sharedMSAData)
  }
  
  changeMSALevel(level : string) {
    this.msaLevel.next(level);
  }

  changeRetailCode(code : string) {
    this.retailCode.next(code);
    }


  changeMsaData(code:any)
    {
      this.msaData.next(code);
    }


}