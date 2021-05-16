import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr'

 @Injectable({
  providedIn: 'root'
})
export class TosterService {
  
    
  constructor(public toastr: ToastrService){}


Success(title:string,message?:string)
{ 
  this.toastr.success(title,message);
}
Warning(title:string,message?:string)
{
  this.toastr.warning(title,message);
 
}
Info(title:string,message?:string)
{
  this.toastr.info(title,message);
}
Error(title:string,message?:string)
{
  this.toastr.error(title,message);
}
// setting()
// {
//   this.toastr.options = {
//     "closeButton": false,
    
//     "debug": false,
//     "newestOnTop": false,
//     "progressBar": false,
//     "positionClass": "toast-bottom-right",
//     "preventDuplicates": false,
//     "onclick": null,
//     "showDuration": "300",
//     "hideDuration": "3000",
//     "timeOut": "5000",
//     "extendedTimeOut": "3000",
//     "showEasing": "swing",
//     "hideEasing": "linear",
//     "showMethod": "fadeIn",
//     "hideMethod": "fadeOut"
//   }
// }
}