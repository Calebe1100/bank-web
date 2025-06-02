import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  standalone: false
})
export class DialogAddComponent {
  constructor(
      public dialogRef: MatDialogRef<DialogAddComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) {}

    onConfirm(): void {
      this.dialogRef.close(true); // Retorna true se confirmar
    }

    onCancel(): void {
      this.dialogRef.close(false); // Retorna false se cancelar
    }
}
