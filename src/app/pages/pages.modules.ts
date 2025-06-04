import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from '../components/components.module';
import { AccountComponent } from './account/account.component';
import { DepositComponent } from './deposit/deposit.component';

import { MatSelectModule } from '@angular/material/select';
import { ExtractComponent } from './extract/extract.component';
import { MatTableModule } from '@angular/material/table';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


@NgModule({
  declarations: [LoginComponent, SignUpComponent, HomeComponent, AccountComponent, DepositComponent, WithdrawComponent, ExtractComponent],
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
  ComponentsModule,
  MatSelectModule,
  MatTableModule,
  NgxMaskDirective,
      NgxMaskPipe 
  ],
  providers: [],
  exports: [],
})
export class PagesModule {}