import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { filter } from "rxjs";

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

  constructor(
    private router: Router,
    private readonly authService: AuthService,
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

    this.name = this.authService.getName() ?? "";
  }

  OnLogout() {
    this.authService.clearLocalStorage();
    this.router.navigate(["login"]);
  }

  OnActionPage(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
