import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User, RegisterRequest, LoginRequest, AuthResponse } from '../models/user.model';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly isLoggedIn = computed(() => !!this._token());
  readonly isAdmin = computed(() => this._user()?.role === 'admin');
  readonly isUser = computed(() => this._user()?.role === 'user');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this._token.set(token);
      this._user.set(JSON.parse(user));
    }
  }

  register(payload: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload);
  }

  login(payload: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload);
  }

  setSession(response: AuthResponse): void {
    this._token.set(response.token);
    this._user.set(response.user);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  getRole(): string | null {
    return this._user()?.role ?? null;
  }

  getUserId(): number | null {
    return this._user()?.id ?? null;
  }
}
