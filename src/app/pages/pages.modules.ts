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


@NgModule({
  declarations: [LoginComponent, SignUpComponent, HomeComponent],
  imports: [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule
  ],
  providers: [],
  exports: [],
})
export class PagesModule {}