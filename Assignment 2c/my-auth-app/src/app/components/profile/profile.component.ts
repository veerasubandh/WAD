// src/app/components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;  // Ensure the user is either a User object or null

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Get the current logged-in user
    this.user = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout();
    this.user = null;  // Reset user data after logout
  }
}
