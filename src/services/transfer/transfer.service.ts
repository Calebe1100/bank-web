import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TransferService {
  private apiUrl = "https://localhost:44360/api/clients";

  constructor(private http: HttpClient) {}

  registerTransfer(
    idClient: string,
    idAccount: string,
    targetClient: number,
    targetAccount: number,
    value: number,
  ) {
    const url = `${this.apiUrl}/${parseInt(
      idClient,
    )}/accounts/${idAccount}/transfers`;
    return this.http.post(
      url,
      { targetClient: targetClient, targetAccount, value: value },
      { responseType: "text" },
    );
  }
}
