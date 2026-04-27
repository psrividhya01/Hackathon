import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email() || !this.password()) {
      this.error.set('Please fill in all fields.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.login({ email: this.email(), password: this.password() }).subscribe({
      next: (res) => {
        this.auth.setSession(res);
        this.loading.set(false);
        this.auth.isAdmin() ? this.router.navigate(['/admin']) : this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Invalid email or password.');
        this.loading.set(false);
      },
    });
  }
}
