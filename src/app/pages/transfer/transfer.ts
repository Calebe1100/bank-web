// .admin-container {
//     padding: 24px;
//     max-width: 1000px;
//     margin: auto;
//   }

//   .filter-container {
//     display: flex;
//     gap: 16px;
//     flex-wrap: wrap;
//     margin-bottom: 16px;
//   }

//   table {
//     width: 100%;
//     margin-top: 16px;
//   }

//   import { Component } from '@angular/core';

// @Component({
//   selector: 'app-inativacao-conta',
//   templateUrl: './inativacao-conta.component.html',
// })
// export class InativacaoContaComponent {
//   cpf = '';
//   contas = [
//     { number: '12345', nome: 'João', document: '123.456.789-00', ativo: true },
//     { number: '54321', nome: 'Maria', document: '987.654.321-00', ativo: true },
//   ];
//   contaEncontrada: any = null;

//   buscarConta() {
//     this.contaEncontrada = this.contas.find(c => c.document === this.cpf);
//   }

//   inativarConta() {
//     if (this.contaEncontrada) {
//       this.contaEncontrada.ativo = false;
//     }
//   }
// }

// <div class="admin-container">
//   <h2>Inativar Contas</h2>

//   <mat-form-field appearance="outline">
//     <mat-label>Buscar CPF</mat-label>
//     <input matInput [(ngModel)]="cpf" (ngModelChange)="buscarConta()" mask="000.000.000-00" />
//   </mat-form-field>

//   <div *ngIf="contaEncontrada">
//     <p>Conta: {{ contaEncontrada.number }}</p>
//     <p>Nome: {{ contaEncontrada.nome }}</p>
//     <p>Status: {{ contaEncontrada.ativo ? 'Ativo' : 'Inativo' }}</p>

//     <button mat-raised-button color="warn" (click)="inativarConta()" *ngIf="contaEncontrada.ativo">
//       Inativar Conta
//     </button>
//   </div>
// </div>

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-transferencias',
//   templateUrl: './transferencias.component.html',
// })
// export class TransferenciasComponent {
//   transferencias = [
//     { contaOrigem: '12345', contaDestino: '54321', valor: 150.50 },
//     { contaOrigem: '11111', contaDestino: '22222', valor: 300.00 },
//     // ...
//   ];

//   filtros = { origem: '', destino: '' };
//   transferenciasFiltradas = [...this.transferencias];

//   colunas: string[] = ['origem', 'destino', 'valor'];

//   aplicarFiltros() {
//     const { origem, destino } = this.filtros;
//     this.transferenciasFiltradas = this.transferencias.filter(t =>
//       (!origem || t.contaOrigem.includes(origem)) &&
//       (!destino || t.contaDestino.includes(destino))
//     );
//   }
// }

// <div class="admin-container">
//   <h2>Transferências Realizadas</h2>

//   <div class="filter-container">
//     <mat-form-field appearance="outline">
//       <mat-label>Conta Origem</mat-label>
//       <input matInput [(ngModel)]="filtros.origem" (input)="aplicarFiltros()" />
//     </mat-form-field>

//     <mat-form-field appearance="outline">
//       <mat-label>Conta Destino</mat-label>
//       <input matInput [(ngModel)]="filtros.destino" (input)="aplicarFiltros()" />
//     </mat-form-field>
//   </div>

//   <table mat-table [dataSource]="transferenciasFiltradas" class="mat-elevation-z8">
//     <ng-container matColumnDef="origem">
//       <th mat-header-cell *matHeaderCellDef>Origem</th>
//       <td mat-cell *matCellDef="let item">{{ item.contaOrigem }}</td>
//     </ng-container>

//     <ng-container matColumnDef="destino">
//       <th mat-header-cell *matHeaderCellDef>Destino</th>
//       <td mat-cell *matCellDef="let item">{{ item.contaDestino }}</td>
//     </ng-container>

//     <ng-container matColumnDef="valor">
//       <th mat-header-cell *matHeaderCellDef>Valor</th>
//       <td mat-cell *matCellDef="let item">
//         {{ item.valor | currency: 'BRL' : 'symbol' : '1.2-2' : 'pt-BR' }}
//       </td>
//     </ng-container>

//     <tr mat-header-row *matHeaderRowDef="colunas"></tr>
//     <tr mat-row *matRowDef="let row; columns: colunas"></tr>
//   </table>
// </div>
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-clientes-admin',
//   templateUrl: './clientes-admin.component.html',
//   styleUrls: ['./clientes-admin.component.scss'],
// })
// export class ClientesAdminComponent {
//   clientes = [
//     { fullName: 'João Silva', document: '123.456.789-00', ativo: true },
//     { fullName: 'Maria Souza', document: '987.654.321-00', ativo: false },
//     // ...
//   ];

//   filtros = { nome: '', cpf: '' };
//   clientesFiltrados = [...this.clientes];

//   colunas: string[] = ['nome', 'cpf', 'status', 'acoes'];

//   aplicarFiltros() {
//     const { nome, cpf } = this.filtros;
//     this.clientesFiltrados = this.clientes.filter(c =>
//       (!nome || c.fullName.toLowerCase().includes(nome.toLowerCase())) &&
//       (!cpf || c.document.includes(cpf))
//     );
//   }

//   inativar(cliente: any) {
//     cliente.ativo = false;
//     this.aplicarFiltros();
//   }
// }

// <div class="admin-container">
//   <h2>Clientes Cadastrados</h2>

//   <div class="filter-container">
//     <mat-form-field appearance="outline">
//       <mat-label>Nome</mat-label>
//       <input matInput [(ngModel)]="filtros.nome" (input)="aplicarFiltros()" />
//     </mat-form-field>

//     <mat-form-field appearance="outline">
//       <mat-label>CPF</mat-label>
//       <input matInput [(ngModel)]="filtros.cpf" mask="000.000.000-00" (input)="aplicarFiltros()" />
//     </mat-form-field>
//   </div>

//   <table mat-table [dataSource]="clientesFiltrados" class="mat-elevation-z8">
//     <ng-container matColumnDef="nome">
//       <th mat-header-cell *matHeaderCellDef>Nome</th>
//       <td mat-cell *matCellDef="let cliente">{{ cliente.fullName }}</td>
//     </ng-container>

//     <ng-container matColumnDef="cpf">
//       <th mat-header-cell *matHeaderCellDef>CPF</th>
//       <td mat-cell *matCellDef="let cliente">{{ cliente.document }}</td>
//     </ng-container>

//     <ng-container matColumnDef="status">
//       <th mat-header-cell *matHeaderCellDef>Status</th>
//       <td mat-cell *matCellDef="let cliente">{{ cliente.ativo ? 'Ativo' : 'Inativo' }}</td>
//     </ng-container>

//     <ng-container matColumnDef="acoes">
//       <th mat-header-cell *matHeaderCellDef>Ações</th>
//       <td mat-cell *matCellDef="let cliente">
//         <button mat-button color="warn" (click)="inativar(cliente)" *ngIf="cliente.ativo">
//           Inativar
//         </button>
//       </td>
//     </ng-container>

//     <tr mat-header-row *matHeaderRowDef="colunas"></tr>
//     <tr mat-row *matRowDef="let row; columns: colunas"></tr>
//   </table>
// </div>
