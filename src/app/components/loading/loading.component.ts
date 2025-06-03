// src/app/components/loading/loading.component.ts
import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-overlay" *ngIf="loading$ | async">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
  standalone: false
})
export class LoadingComponent {

    loading$?:Observable<boolean>;

    constructor(private loadingService: LoadingService) {this.loading$ = this.loadingService.loading$;}

    

}
