import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-lista-dados',
  standalone: false,
  templateUrl: './lista-dados.component.html',
  styleUrls: ['./lista-dados.component.scss'],
})
export class ListaDadosComponent implements OnChanges {
  @Input() headers: string[] = []; // Cabeçalhos visíveis
  @Input() fields: string[] = [];  // Nomes das propriedades no objeto
  @Input() data: any[] = [];       // Dados da tabela

  displayedColumns: string[] = [];

  ngOnChanges() {
    this.displayedColumns = this.fields;
  }
}
