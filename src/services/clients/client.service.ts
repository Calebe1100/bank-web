import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../app/models/User';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:44360/api/clients';

  constructor(private http: HttpClient) {}

  registerClient(name: string, document: string, password: string, phone: string, email: string) {
    return this.http.post(this.apiUrl, { name, document, password, phone, email }, { responseType: 'text' });
  }

    getProfile(idClient: string): Observable<{ name: string; phone: string; email: string }> {
    return this.http.get<{ name: string; phone: string; email: string }>(`${this.apiUrl}/${parseInt(idClient)}`);
  }

  updateProfile(data: User, idClient: string): Observable<string> {
    const url = `${this.apiUrl}/${parseInt(idClient)}`;
    return this.http.put(url, data, { responseType: 'text' });
  }

  setToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }
}
