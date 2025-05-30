import { Component } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
  standalone: false
})
export class DepositComponent {


  setDeposit({ conta, valor }: { conta: string, valor: number }) {
    console.log(`Depositar R$ ${valor} na conta ${conta}`);
    // Chamar serviço de depósito aqui
  }
accounts: string[] = [];

}
