import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  testLogin(): void {
    // Call the AuthService login method to update the login state
    this.authService.login();
    alert('Fake login successful');
    
    // Redirect the user to the dashboard
    this.router.navigateByUrl('/dashboard');
  }
}
