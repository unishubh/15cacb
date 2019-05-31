import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private myRoute: Router) { }

  isLoggedIn() {
    if(localStorage.getItem('token') != null) {
      return true;
    }
    else {
      return false;
    }
  }
}
