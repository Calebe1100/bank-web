import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListaDadosComponent } from './lista-dados/lista-dados.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


@NgModule({
  declarations: [ListaDadosComponent, DialogAddComponent, TransactionFormComponent],
  imports: [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatOptionModule,
    MatSelectModule,
      NgxMaskDirective,
          NgxMaskPipe 
    
  ],
  exports: [ListaDadosComponent, DialogAddComponent, TransactionFormComponent],
})
export class ComponentsModule {}