import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../../app/models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://localhost:44360/api/clients';

  constructor(private http: HttpClient) {}

  registerAccount(idClient: string) {
    const url = `${this.apiUrl}/${parseInt(idClient)}/accounts`
    return this.http.post<{}>(url, {idClient});
  }

  getAccounts(idClient: string) {
    return this.http.get<Account[]>(`${this.apiUrl}/${idClient}/accounts`);
  }
}
