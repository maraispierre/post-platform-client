import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccessToken } from '../models/access-token';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'http://localhost:3000/auth';
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<AccessToken> {
    return this.http.post<AccessToken>(`${this.BASE_URL}/login`, credentials);
  }

  register(credentials: Credentials): Observable<Profile> {
    return this.http.post<Profile>(`${this.BASE_URL}/register`, credentials);
  }

  getToken(): AccessToken | null {
    return localStorage.getItem('accessToken') === null
      ? null
      : new AccessToken(localStorage.getItem('accessToken') as string);
  }
}
