import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../../app/models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'https://localhost:44360/api/clients';

  constructor(private http: HttpClient) {}

  registerDeposit( idClient: string,idAccount: number, value: number) {
    const url = `${this.apiUrl}/${idClient}/accounts/${idAccount}/transactions/deposits`
    return this.http.post(url, { value}, { responseType: 'text' });
  }

    registerWithDraw( idClient: string,idAccount: number, value: number) {
    const url = `${this.apiUrl}/${idClient}/accounts/${idAccount}/transactions/withdraws`
    return this.http.post(url, { value}, { responseType: 'text' });
  }

  getTransactions(idClient: string,idAccount: string) {
    return this.http.get<Transaction[]>(`${this.apiUrl}/${idClient}/accounts/${idAccount}/transactions`);
  }
}
