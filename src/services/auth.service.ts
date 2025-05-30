import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44360/api/login';

  constructor(private http: HttpClient) {}

  login(document: string, password: string) {
    return this.http.post<{ idClient: number; token: string, name: string }>(this.apiUrl, { document, password });
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

  getIdClient() {
    return localStorage.getItem('id_client');
  }

  setIdClient(idClient: number) {
    return localStorage.setItem('id_client', idClient.toString());
  }

  clearLocalStorage(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('name');
    localStorage.removeItem('id_client');
  }
}
