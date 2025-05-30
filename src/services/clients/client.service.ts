import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:44360/api/clients';

  constructor(private http: HttpClient) {}

  registerClient(name: string, document: string, password: string, phone: string ) {
    return this.http.post<{ token: string }>(this.apiUrl, { name, document, password, phone });
  }

  setToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }
}
