import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  get(what): String {
    return window.sessionStorage[what];
  }

}
