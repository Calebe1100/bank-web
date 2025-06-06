// src/app/services/notification.service.ts
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.snackBar.open(message, "Fechar", {
      duration: 5000,
      panelClass: ["snackbar-success"],
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, "Fechar", {
      duration: 5000,
      panelClass: ["snackbar-error"],
    });
  }
}
