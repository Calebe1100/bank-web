import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../../services/account/account.service";
import { AuthService } from "../../../services/auth.service";
import { Account } from "../../models/Account";
import { TransactionService } from "../../../services/transactions/transaction.service";
import { NotificationService } from "../../../services/notification.service";
import { BehaviorSubject } from "rxjs";
import { TransferService } from "../../../services/transfer/transfer.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-transfer",
  templateUrl: "./transfer.component.html",
  styleUrl: "./transfer.component.scss",
  standalone: false,
})
export class TransferComponent implements OnInit {
  accounts: Account[] = [];
  allAccounts: Account[] = [];
  listChange$ = new BehaviorSubject<void>(undefined);
  form: FormGroup;

  constructor(
    private readonly accountService: AccountService,
    public readonly authService: AuthService,
    private readonly transferService: TransferService,
    private readonly notificationService: NotificationService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      conta: [null, Validators.required],
      contaDestino: [null, [Validators.required]],
      valor: [null, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.setTransfer(this.form.value);
    }
  }

  ngOnInit(): void {
    this.loadTransfers();
    this.loadAllAccounts();
  }

  loadAllAccounts() {
    this.accountService
      .getAllAccounts(this.authService.getIdClient() ?? "")
      .subscribe(
        (r) =>
          (this.allAccounts = r.map<Account>((r) => {
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

  private loadTransfers() {
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

  setTransfer({
    conta,
    contaDestino,
    valor,
  }: {
    conta: Account;
    contaDestino: Account;
    valor: number;
  }) {
    this.transferService
      .registerTransfer(
        this.authService.getIdClient() ?? "",
        conta.id.toString(),
        contaDestino.idClient,
        contaDestino.id,
        valor,
      )
      .subscribe(() => {
        this.loadTransfers();
        this.notificationService.showSuccess(
          "Transferencia realizado com sucesso!",
        );
      });
  }
}
