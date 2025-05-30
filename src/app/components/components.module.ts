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


@NgModule({
  declarations: [ListaDadosComponent],
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
  MatTableModule
  ],
  exports: [ListaDadosComponent],
})
export class ComponentsModule {}