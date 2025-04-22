import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') === 'true');
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  login(): void {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedInSubject.next(false);
  }
}
