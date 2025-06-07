import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  standalone: false,
})
export class HomeComponent {
  OnActionPage(route: string) {
    if (route == "login") {
      this.authService.clearLocalStorage();
    }
    this.router.navigate([route]);
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    if (
      this.authService.getToken() == "" ||
      this.authService.getToken() == null
    ) {
      this.router.navigate(["/login"]);
    }

    if (
      this.authService.getName() == "" ||
      this.authService.getName() == null
    ) {
      setInterval(() => location.reload(), 1000);
    }
  }

  actions = [
    { label: "Contas", icon: "person_add", route: "account" },
    { label: "Saque", icon: "attach_money", route: "withdraw" },
    { label: "Depósito", icon: "account_balance", route: "deposit" },
    { label: "Transferência", icon: "sync_alt", route: "transfer" },
    { label: "Extrato", icon: "receipt", route: "extract" },
    { label: "Sair", icon: "logout", route: "login" },
  ];
}
