import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/clients/client.service';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  standalone: false
})
export class SignUpComponent {

  constructor(private readonly router: Router, private readonly clientService: ClientService, private readonly authService: AuthService, private readonly notification: NotificationService){}
  
  form: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    document: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });


  error: string | null = null;

  submit() {
    if (this.form.valid) {
      const { password, confirmPassword } = this.form.value;
      
      if (password !== confirmPassword) {
        this.error = "As senhas não coincidem!";
        return;
      }

      this.clientService.registerClient(this.form.controls['fullName'].value, this.form.controls['document'].value, this.form.controls['password'].value,
         this.form.controls['phone'].value).subscribe(() => {
          this.notification.showSuccess("Usuário Cadastrado com sucesso")
          this.router.navigate(['/login']); });

    } else {
      this.error = "Preencha todos os campos corretamente!";
    }
  }

  OnLogin(){
    this.router.navigate(['/']);
  }
}
