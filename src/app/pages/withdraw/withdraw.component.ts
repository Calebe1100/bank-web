import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../../services/account/account.service";
import { AuthService } from "../../../services/auth.service";
import { Account } from "../../models/Account";
import { TransactionService } from "../../../services/transactions/transaction.service";
import { NotificationService } from "../../../services/notification.service";
import { BehaviorSubject, timeInterval, timeout } from "rxjs";

@Component({
  selector: "app-withdraw",
  templateUrl: "./withdraw.component.html",
  styleUrl: "./withdraw.component.scss",
  standalone: false,
})
export class WithdrawComponent implements OnInit {
  accounts: Account[] = [];

  listChange$ = new BehaviorSubject<void>(undefined);

  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly transactionService: TransactionService,
    private readonly notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  private loadAccounts() {
    this.accountService
      .getAccounts(this.authService.getIdClient() ?? "")
      .subscribe(
        (r) =>
          (this.accounts = r.map<Account>((r) => {
            return {
              id: r.id,
              idClient: r.idClient,
              number: r.number,
              value: r.value,
              creditLimit: r.creditLimit,
            };
          })),
      );
  }

  setWithDraw({ conta, valor }: { conta: Account; valor: number }) {
    this.transactionService
      .registerWithDraw(this.authService.getIdClient() ?? "", conta.id, valor)
      .subscribe((resp) => {
        if (resp == "Saldo insulficiente.") {
          this.notificationService.showError(resp);
          return;
        }
        this.loadAccounts();
        this.notificationService.showSuccess("Saque realizado com sucesso!");
      });
  }
}
