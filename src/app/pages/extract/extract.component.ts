import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AccountService } from "../../../services/account/account.service";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { Account } from "../../models/Account";
import { TransactionService } from "../../../services/transactions/transaction.service";
import { Transaction } from "../../models/Transaction";


@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss'],
  standalone: false
})
export class ExtractComponent implements OnInit{

    constructor(private dialog: MatDialog, private readonly accountService: AccountService, private readonly authService: AuthService, private readonly router: Router
      , private readonly extractService: TransactionService
    ) {
  }

  contas: Account[] = [];

    ngOnInit(): void {
      this.accountService.getAccounts(this.authService.getIdClient() ?? "").subscribe(r => this.contas =  r.map<Account>( r => { return {id: r.id, idClient: r.idClient, number: r.number} } ))
    }

  contaSelecionada: any = null;
  extrato: Transaction[] = [];

  consultarExtrato() {
    const conta = this.contas.find(c => c.number === this.contaSelecionada);

    this.extractService.getTransactions(this.authService.getIdClient()?? "", conta?.id.toString() ?? "").subscribe(r => this.extrato = r)
  }
}

