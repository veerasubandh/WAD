// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: User | null = null;

  constructor() {}

  // Register a new user
  register(user: User): void {
    // Store the user details in localStorage (simple mock database)
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Login the user
  login(user: User): boolean {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.username === user.username && storedUser.password === user.password) {
      this.loggedInUser = storedUser;
      return true;
    }
    return false;
  }

  // Get logged-in user data
  getUser(): User | null {
    return this.loggedInUser || JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  // Logout the user
  logout(): void {
    this.loggedInUser = null;
    localStorage.removeItem('user');
  }
}
