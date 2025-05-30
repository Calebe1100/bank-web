import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent implements OnInit {



OnActionPage(route: string) {
  this.router.navigate([route])
}

  
  constructor (private readonly authService: AuthService, private readonly router: Router) {
    this.name = this.authService.getName();
  }

  OnLogout() {
    this.authService.clearLocalStorage();
    this.router.navigate(['']);
  }
  name: string | null;

  ngOnInit(): void {
    
  }

  actions = [
  { label: 'Contas', icon: 'person_add', route:'' },
  { label: 'Saque', icon: 'attach_money', route:'' },
  { label: 'Depósito', icon: 'account_balance', route:'' },
  { label: 'Extrato', icon: 'receipt', route:'' },
  { label: 'Sair', icon: 'logout', route:'' }
];
  
}
