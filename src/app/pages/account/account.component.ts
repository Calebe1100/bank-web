import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone:false
})
export class AccountComponent {
  contas = [
    { numero: 'MA-120214', saldo: 2300.00 },
    { numero: 'MA-548745', saldo: 1050.00 }
  ];

  headers = ['Número da conta', 'Saldo'];
  fields = ['numero', 'saldo'];

  criarNovaConta() {
    console.log('Nova conta criada');
    // aqui você pode redirecionar ou abrir modal/form
  }
}
