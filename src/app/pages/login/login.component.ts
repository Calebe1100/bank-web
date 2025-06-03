import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private notification: NotificationService
  ) {}

  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(11)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  @Input() error: string | null = null;
  @Output() submitEM = new EventEmitter();

  submit() {
    this.error = null;

    if (this.form.valid) {
      this.authService.login(
        this.form.controls['username'].value,
        this.form.controls['password'].value
      ).subscribe({
        next: (resp) => {
          this.authService.setToken(resp.token);
          this.authService.setName(resp.name);
          this.authService.setIdClient(resp.idClient);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          const message = err.error?.message || 'Erro ao fazer login';
          this.error = message;
          this.notification.showError(message);
        }
      });
    } else {
      const usernameErrors = this.form.controls['username'].errors;
      const passwordErrors = this.form.controls['password'].errors;

      if (usernameErrors) {
        if (usernameErrors['required']) {
          this.error = 'O campo usuário é obrigatório.';
        } else if (usernameErrors['minlength']) {
          this.error = 'O campo usuário deve ter no mínimo 6 caracteres.';
        } else if (usernameErrors['maxlength']) {
          this.error = 'O campo usuário deve ter no máximo 11 caracteres.';
        }
      } else if (passwordErrors) {
        if (passwordErrors['required']) {
          this.error = 'O campo senha é obrigatório.';
        } else if (passwordErrors['minlength']) {
          this.error = 'O campo senha deve ter no mínimo 8 caracteres.';
        }
      } else {
        this.error = 'Preencha todos os campos corretamente.';
      }

      this.notification.showError(this.error ?? "Erro");
    }
  }

  OnSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
