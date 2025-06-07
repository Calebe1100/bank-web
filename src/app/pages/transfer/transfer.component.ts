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
  listChange$ = new BehaviorSubject<void>(undefined);
  form: FormGroup;

  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly transferService: TransferService,
    private readonly notificationService: NotificationService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      conta: [null, Validators.required],
      contaDestino: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
      valor: [null, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.setDeposit(this.form.value);
    }
  }

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
            };
          })),
      );
  }

  setDeposit({ conta, valor }: { conta: Account; valor: number }) {
    this.transferService
      .registerTransfer(
        this.authService.getIdClient() ?? "",
        conta.id.toString(),
        valor,
        "1",
        3,
      )
      .subscribe(() => {
        this.loadDeposits();
        this.notificationService.showSuccess("Deposito realizado com sucesso!");
      });
  }
}
