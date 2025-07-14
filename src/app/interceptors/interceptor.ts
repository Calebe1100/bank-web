import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private notification: NotificationService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Verifica se o token expirou ou é inválido
        if (error.status === 401 || error.status === 403) {
          this.authService.clearLocalStorage();
          this.router.navigate(["/login"]);
          const message =
            error.message || error.error?.message || "Erro inesperado!";
          this.notification.showError(message);
        }

        return throwError(() => error);
      }),
    );
  }
}
