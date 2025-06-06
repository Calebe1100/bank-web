import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Account } from "../../models/Account";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: "app-transaction-form",
  templateUrl: "./transaction-form.component.html",
  styleUrl: "./transaction-form.component.scss",
  standalone: false,
})
export class TransactionFormComponent {
  @Input() onListChange?: BehaviorSubject<void>;

  private listChangeSub?: Subscription;

  @Input() title: string = "";
  @Input() buttonLabel: string = "Confirmar";
  @Input() contas: Account[] = [];
  @Output() onSubmit = new EventEmitter<{ conta: Account; valor: number }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      conta: [null, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  ngOnInit() {
    if (this.onListChange) {
      this.listChangeSub = this.onListChange.subscribe(() => {
        this.refreshData();
      });
    }
  }

  refreshData() {
    this.contas = [...this.contas]; // força detecção de mudança se necessário
  }

  ngOnDestroy() {
    this.listChangeSub?.unsubscribe();
  }
}
