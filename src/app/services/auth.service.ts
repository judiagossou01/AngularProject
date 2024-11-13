import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private BASE_URL = 'http://localhost:8000';

  user = signal<User | null | undefined>(undefined);

  authenticateUser(loginData: LoginCredentials): Observable<User | null | undefined> {
    return this.http.post<User | null | undefined>(`${this.BASE_URL}/sessions/login`, loginData);
  }
}
