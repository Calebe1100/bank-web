import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44360/api/login';

  constructor(private http: HttpClient) {}

  login(document: string, password: string) {
    return this.http.post<{ token: string, name: string }>(this.apiUrl, { document, password });
  }

  setToken(token: string) {
    localStorage.setItem('jwt', token);
  }

    setName(name: string) {
    localStorage.setItem('name', name);
    }

  getName() {
    return localStorage.getItem('name');
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  clearLocalStorage(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('name');
  }
}
