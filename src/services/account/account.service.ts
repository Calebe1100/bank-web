import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Account } from "../../app/models/Account";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private apiUrl = "https://localhost:44360/api/clients";

  constructor(private http: HttpClient) {}

  registerAccount(idClient: string) {
    const url = `${this.apiUrl}/${parseInt(idClient)}/accounts`;
    return this.http.post(url, { idClient }, { responseType: "text" });
  }

  updateAccount(idClient: string, idAccount: string, value: number) {
    const url = `${this.apiUrl}/${parseInt(idClient)}/accounts/${idAccount}`;
    return this.http.put(
      url,
      { idClient, idAccount, creditLimit: value },
      { responseType: "text" },
    );
  }

  getAccounts(idClient: string) {
    return this.http.get<Account[]>(`${this.apiUrl}/${idClient}/accounts`);
  }
}
