import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: { name: string; email: string; password: string }[] = [];
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserNameSubject = new BehaviorSubject<string | null>(null);

  // Simulate a logged-in user in memory
  private loggedInUser: { name: string; email: string } | null = null;

  constructor() { }

  // Login method
  login(credentials: { email: string; password: string }): boolean {
    const user = this.users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      this.isAuthenticatedSubject.next(true);
      this.currentUserNameSubject.next(user.name);
      this.loggedInUser = { name: user.name, email: user.email }; // Store logged-in user
      return true;
    }

    return false;
  }



  // Signup method
  signup(userData: { name: string; email: string; password: string }): void {
    const userExists = this.users.some((u) => u.email === userData.email);

    if (userExists) {
      throw new Error('User with this email already exists.');
    }

    this.users.push(userData);
  }

  // Observable for authentication status
  isLoggedIn() {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Observable for the current user's name
  get currentUserName$() {
    return this.currentUserNameSubject.asObservable();
  }

  // Logout method
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.currentUserNameSubject.next(null);
    this.loggedInUser = null;
     // Clear the user in memory
  }


  // Initialize login state (on page refresh)
  initializeLoginState() {
    if (this.loggedInUser) {
      this.isAuthenticatedSubject.next(true);
      this.currentUserNameSubject.next(this.loggedInUser.name);
    }
  }
}
