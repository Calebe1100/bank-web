import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddComponent } from "../../components/dialog-add/dialog-add.component";
import { AccountService } from "../../../services/account/account.service";
import { AuthService } from "../../../services/auth.service";
import { Account } from "../../models/Account";
import { Router } from "@angular/router";
import { NotificationService } from "../../../services/notification.service";
import { BehaviorSubject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export interface AccountFormatted extends Account {
  valueFormatted: string;
  creditLimitFormatted: string;
}

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
  standalone: false,
})
export class AccountComponent implements OnInit {
  listChange$ = new BehaviorSubject<void>(undefined);

  contas: AccountFormatted[] = [];
  form: FormGroup;

  constructor(
    private dialog: MatDialog,
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private notification: NotificationService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      conta: [null, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  refreshList() {
    this.listChange$.next();
  }

  submit() {
    if (this.form.valid) {
      this.accountService
        .updateAccount(
          this.authService.getIdClient() ?? "",
          this.form.controls["conta"].value.id,
          this.form.controls["valor"].value,
        )
        .subscribe((resp) => {
          this.loadAccounts();
          this.refreshList();
          this.notification.showSuccess(resp);
        });
    }
  }

  OnLogout() {
    this.authService.clearLocalStorage();
    this.router.navigate([""]);
  }

  OnActionPage() {
    this.router.navigate(["home"]);
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  headers = ["Número da conta", "Saldo", "Limite de crédito"];
  fields = ["number", "valueFormatted", "creditLimitFormatted"];

  private loadAccounts() {
    this.accountService
      .getAccounts(this.authService.getIdClient() ?? "")
      .subscribe(
        (r) =>
          (this.contas = r.map<AccountFormatted>((r) => {
            return {
              id: r.id,
              idClient: r.idClient,
              number: r.number,
              value: r.value,
              valueFormatted: `RS ${r.value.toFixed(2).replace(".", ",")}`,
              creditLimit: r.creditLimit,
              creditLimitFormatted: `RS ${r.creditLimit
                .toFixed(2)
                .replace(".", ",")}`,
            };
          })),
      );
  }

  createNewAccount() {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: "350px",
      data: {
        message: "Tem certeza que deseja adicionar uma nova conta?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.accountService
          .registerAccount(this.authService.getIdClient() ?? "")
          .subscribe(() => {
            this.loadAccounts();
            this.listChange$.next();
            this.notification.showSuccess("Conta criada com sucesso!");
          });
      }
    });
  }
}
