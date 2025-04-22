import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../app/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status; 
    });
  }

  logout(): void {
    this.authService.logout();
    alert('Fake logout successful');
    this.router.navigateByUrl('/login');
  }
}
