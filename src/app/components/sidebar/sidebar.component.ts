import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { filter } from "rxjs";
import { AccountService } from "../../../services/account/account.service";
import { Account } from "../../models/Account";
import { EconomyService } from "../../../services/transactions/economyService";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  standalone: false,
})
export class SidebarComponent {
  showHeader: boolean = false;
  name = "";
  isExpanded = false;
  totalSald: number = 0;
  taxas: any[] = [];

  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
    private readonly economyService: EconomyService,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showHeader = !(
          event.url.includes("/sign-up") ||
          event.url.includes("/login") ||
          event.url == "/"
        );
      });

    this.showHeader = false;
    this.name = this.authService.getName() ?? "";
    this.loadTotalSald();

    this.economyService.getTaxas().subscribe((res) => {
      this.taxas = res;

      this.showHeader = true;
    });
  }

  private loadTotalSald() {
    this.accountService
      .getAccounts(this.authService.getIdClient() ?? "")
      .subscribe((r) => {
        this.totalSald = 0;
        r.forEach((r) => {
          this.totalSald = this.totalSald + r.value - r.creditLimit;
        });
      });
  }

  OnLogout() {
    this.authService.clearLocalStorage();
    this.router.navigate(["login"]);
  }

  OnActionPage(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
