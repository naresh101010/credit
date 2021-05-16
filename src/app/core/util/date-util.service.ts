import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DateUtilService {

  constructor() { }

  getFormatedDate(format: string, date: Date) {
    return moment(date).format(format);
  }
  getFormatedTime(format: string, time: string) {
    return moment(time, "HH:mm").format(format);
  }
  getOneMonthBeforeCurrentDate() {
    return moment().subtract(1, 'months').toDate();
  }
  getDateFromDateTime(date: any, time: any) {
    console.log('date', date, time)
    return moment(`${date} ${time}`).format();
  }
  getDateFromString(dateString: string) {
    return moment(dateString, "DD/MM/YYYY").toDate();
  }
  getNextDate(date: any) {
    return moment(date).add(1, 'days').toDate();
  }
  getDateafterDay(date: any, days) {
    return moment(date).add(days, 'days').toDate();
  }
  checkDateBeforeYesterday(date: any) {
    const yesterday = moment().subtract(1, 'day').toDate();
    // console.log('yesterday', yesterday);
    // console.log('lastDayendDate', date);
    const res = moment(date).isBefore(yesterday, 'day');
    // console.log(res);
    return res;
  }
  checkDateIsToday(date: any) {
    var date1 = moment(date);
    var date2 = moment(new Date());
    return date1.isSame(date2,'day');
  }
}
