import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/clients/client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ClientService,
    private snackBar: MatSnackBar,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required]]
    });

    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile(this.authService.getIdClient() ?? "").subscribe(user => {
      this.form.patchValue({
        name: user.name,
        phone: user.phone,
        email: user.email
      });
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.profileService.updateProfile(this.form.value, this.authService.getIdClient() ?? "").subscribe(() => {
      this.snackBar.open('Perfil atualizado com sucesso!', '', {
        duration: 3000,
        panelClass: 'snackbar-success'
      });
    });
  }
}
