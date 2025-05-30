import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from '../../components/dialog-add/dialog-add.component';
import { AccountService } from '../../../services/account/account.service';
import { AuthService } from '../../../services/auth.service';
import { Account } from '../../models/Account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone:false
})
export class AccountComponent implements OnInit{
  
  contas: Account[] = [];
  name: string | null;

  constructor(private dialog: MatDialog, private readonly accountService: AccountService, private readonly authService: AuthService, private readonly router: Router) {
    this.name = this.authService.getName();
  }

  OnLogout() {
    this.authService.clearLocalStorage();
    this.router.navigate(['']);
  }

  OnActionPage() {
  this.router.navigate(['home'])
}


  ngOnInit(): void {
    this.accountService.getAccounts(this.authService.getName() ?? "").subscribe(r => this.contas =  r.map<Account>( r => { return {id: r.id, idClient: r.idClient, number: r.number} } ))
  }

  headers = ['Número da conta', 'Saldo'];
  fields = ['number', 'saldo'];

  criarNovaConta() {
    const dialogRef = this.dialog.open(DialogAddComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.accountService.registerAccount(result.numeroConta, this.authService.getIdClient() ?? "").subscribe(() => location.reload());
        }
      });  
    }
}
