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
    this.authService.login();
    alert('Fake login successful');
    this.router.navigateByUrl('/dashboard');
  }
}
