import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authState: boolean;

  constructor() { }

  public isAuth(): boolean {
    return (localStorage.getItem('email') && localStorage.getItem('password')) ? true : false;
  }
}
