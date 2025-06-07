import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../../services/account/account.service";
import { AuthService } from "../../../services/auth.service";
import { Account } from "../../models/Account";
import { TransactionService } from "../../../services/transactions/transaction.service";
import { NotificationService } from "../../../services/notification.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-deposit",
  templateUrl: "./deposit.component.html",
  styleUrl: "./deposit.component.scss",
  standalone: false,
})
export class DepositComponent implements OnInit {
  accounts: Account[] = [];
  listChange$ = new BehaviorSubject<void>(undefined);

  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly transactionService: TransactionService,
    private readonly notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadDeposits();
  }

  private loadDeposits() {
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

  setDeposit({ conta, valor }: { conta: Account; valor: number }) {
    this.transactionService
      .registerDeposit(this.authService.getIdClient() ?? "", conta.id, valor)
      .subscribe(() => {
        this.loadDeposits();
        this.notificationService.showSuccess("Deposito realizado com sucesso!");
      });
  }
}
