import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {

  constructor(private readonly router: Router, private readonly authService: AuthService){}

  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.controls['username'].value, this.form.controls['password'].value).subscribe((resp) => 
        {
          this.authService.setToken(resp.token); 
          this.router.navigate(['/home']); 
        })
      
    }
  }

  OnSignUp(){
    this.router.navigate(['/sign-up']);
  }

  @Input() error: string | null = null;
  @Output() submitEM = new EventEmitter();
}
