import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone:false
})
export class AppComponent {
  showHeader: boolean = false;
  name = '';

  constructor(private router: Router, private readonly authService: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showHeader = !event.url.includes('/login');
      });

      this.name = this.authService.getName() ?? "";
  }

  OnLogout() {
    this.authService.clearLocalStorage();
    this.router.navigate(['']);
  }

  OnActionPage(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
