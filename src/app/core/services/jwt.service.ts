import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  get(what): string {
    return window.sessionStorage[what];
  }

}
