import { Component, Input, OnChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: "app-lista-dados",
  standalone: false,
  templateUrl: "./lista-dados.component.html",
  styleUrls: ["./lista-dados.component.scss"],
})
export class ListaDadosComponent implements OnChanges {
  @Input() headers: string[] = []; // Cabeçalhos visíveis
  @Input() fields: string[] = []; // Nomes das propriedades no objeto
  @Input() data: any[] = []; // Dados da tabela

  @Input() onListChange?: BehaviorSubject<void>; // Evento externo para recarregar

  displayedColumns: string[] = [];

  private listChangeSub?: Subscription;

  ngOnChanges() {
    this.displayedColumns = this.fields;
  }

  ngOnInit() {
    if (this.onListChange) {
      this.listChangeSub = this.onListChange.subscribe(() => {
        this.refreshData();
      });
    }
  }

  refreshData() {
    this.data = [...this.data]; // força detecção de mudança se necessário
  }

  ngOnDestroy() {
    this.listChangeSub?.unsubscribe();
  }
}
