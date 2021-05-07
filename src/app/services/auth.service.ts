import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccessToken } from '../models/access-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://my-posts-api.herokuapp.com/auth';
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<AccessToken> {
    return this.http.post<AccessToken>(`${this.BASE_URL}/login`, credentials);
  }

  register(credentials: Credentials): Observable<AccessToken> {
    return this.http.post<AccessToken>(
      `${this.BASE_URL}/register`,
      credentials
    );
  }

  getToken(): AccessToken | null {
    return localStorage.getItem('accessToken') === null
      ? null
      : new AccessToken(localStorage.getItem('accessToken') as string);
  }
}
