import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { AuthService } from '../../../services/auth.service';
import { Account } from '../../models/Account';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
  standalone: false
})
export class DepositComponent implements OnInit {
  accounts: Account[] = [];
  
  constructor(private readonly accountService: AccountService, private readonly authService: AuthService){}

  ngOnInit(): void {
    this.accountService.getAccounts(this.authService.getName() ?? "").subscribe(r => this.accounts =  r.map<Account>( r => { return {id: r.id, idClient: r.idClient, number: r.number} } ))
  }


  setDeposit({ conta, valor }: { conta: string, valor: number }) {
    console.log(`Depositar R$ ${valor} na conta ${conta}`);
    // Chamar serviço de depósito aqui
  }

}
