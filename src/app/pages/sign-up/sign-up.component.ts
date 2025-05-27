import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  standalone: false
})
export class SignUpComponent {

  constructor(private readonly router: Router){}
  
  form: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
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

      // Simulação de cadastro bem-sucedido
      console.log("Usuário cadastrado:", this.form.value);
    } else {
      this.error = "Preencha todos os campos corretamente!";
    }
  }

  OnLogin(){
    this.router.navigate(['/']);
  }
}
