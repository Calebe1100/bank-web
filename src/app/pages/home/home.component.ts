import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent {



OnActionPage(route: string) {
  this.router.navigate([route])
}

  
  constructor (private readonly authService: AuthService, private readonly router: Router) {
    if(this.authService.getToken() == '' || this.authService.getToken() == null){
      this.router.navigate(['/login'])
    }
    
  }



  actions = [
  { label: 'Contas', icon: 'person_add', route:'account' },
  { label: 'Saque', icon: 'attach_money', route:'withdraw' },
  { label: 'Depósito', icon: 'account_balance', route:'deposit' },
  { label: 'Extrato', icon: 'receipt', route:'extract' },
  { label: 'Sair', icon: 'logout', route:'' }
];
  
}
