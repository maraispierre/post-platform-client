import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private BASE_URL = 'http://localhost:3000/post';
  constructor(private http: HttpClient) {}

  publish(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.BASE_URL}/publish`, post);
  }

  display(): Observable<Post[]> {
    console.log('service');
    return this.http.get<Post[]>(`${this.BASE_URL}/display`);
  }
}
