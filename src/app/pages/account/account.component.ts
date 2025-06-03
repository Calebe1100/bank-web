import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from '../../components/dialog-add/dialog-add.component';
import { AccountService } from '../../../services/account/account.service';
import { AuthService } from '../../../services/auth.service';
import { Account } from '../../models/Account';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone:false
})
export class AccountComponent implements OnInit{
  
  contas: Account[] = [];

  constructor(private dialog: MatDialog, private readonly accountService: AccountService, private readonly authService: AuthService, private readonly router: Router, private notification: NotificationService) {
  }

  OnLogout() {
    this.authService.clearLocalStorage();
    this.router.navigate(['']);
  }

  OnActionPage() {
  this.router.navigate(['home'])
}


  ngOnInit(): void {
    this.accountService.getAccounts(this.authService.getIdClient() ?? "").subscribe(r => this.contas =  r.map<Account>( r => { return {id: r.id, idClient: r.idClient, number: r.number, value: r.value } }))
  }

  headers = ['Número da conta', 'Saldo'];
  fields = ['number', 'value'];

  createNewAccount() {
      const dialogRef = this.dialog.open(DialogAddComponent, {
          width: '350px',
          data: {
            message: 'Tem certeza que deseja adicionar uma nova conta?'
          }
        });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.accountService.registerAccount(this.authService.getIdClient() ?? "").subscribe(() => location.reload());
        }
      }); 
  }
}
