// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User('', '', '');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user);
    this.router.navigate(['/login']);
  }
}
