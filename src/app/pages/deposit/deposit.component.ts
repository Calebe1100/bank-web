import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { AuthService } from '../../../services/auth.service';
import { Account } from '../../models/Account';
import { TransactionService } from '../../../services/transactions/transaction.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
  standalone: false
})
export class DepositComponent implements OnInit {
  accounts: Account[] = [];
  
  constructor(private readonly accountService: AccountService, private readonly authService: AuthService, private readonly transactionService: TransactionService){}

  ngOnInit(): void {
    this.accountService.getAccounts(this.authService.getName() ?? "").subscribe(r => this.accounts =  r.map<Account>( r => { return {id: r.id, idClient: r.idClient, number: r.number, value: r.value }} ))
  }


  setDeposit({ conta, valor }: { conta: Account, valor: number }) {
    this.transactionService.registerDeposit(this.authService.getIdClient() ?? "", conta.number, valor).subscribe(()=> {})
  }

}
