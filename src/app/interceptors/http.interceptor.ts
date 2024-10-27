import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LOGIN_REDIRECT_URI } from '../constants/apis';

export function httpClientInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(tap({
    error: error => {
      if (error.status == 403) {
        window.location.replace(`${LOGIN_REDIRECT_URI}?redirect_uri=${encodeURI(window.location.origin)}/profiles/profile`);
      }
    }
  }));
}
