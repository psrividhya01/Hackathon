import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  loading = signal(false);
  error = signal('');
  success = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.name() || !this.email() || !this.password()) {
      this.error.set('Please fill in all fields.');
      return;
    }
    if (this.password() !== this.confirmPassword()) {
      this.error.set('Passwords do not match.');
      return;
    }
    if (this.password().length < 6) {
      this.error.set('Password must be at least 6 characters.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.auth
      .register({ name: this.name(), email: this.email(), password: this.password() })
      .subscribe({
        next: (res) => {
          this.auth.setSession(res);
          this.loading.set(false);
          this.success.set(true);
          setTimeout(() => this.router.navigate(['/home']), 1000);
        },
        error: (err) => {
          this.error.set(err.error?.message || 'Registration failed. Please try again.');
          this.loading.set(false);
        },
      });
  }
}
