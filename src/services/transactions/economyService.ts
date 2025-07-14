import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tax } from "./Tax";

@Injectable({ providedIn: "root" })
export class EconomyService {
  constructor(private http: HttpClient) {}

  private apiUrl = "https://localhost:44360/api/economy/tax";

  getTaxas(): Observable<Tax[]> {
    return this.http.get<Tax[]>(this.apiUrl);
  }
}
