import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInterseptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const apiRequest = req.clone({
    //   url: `${this.apiUrl}${req.url}`,
    //   headers,
    //   withCredentials
    // });

    let headers = req.headers;

    const token = localStorage.getItem('token');

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    const apiRequest = req.clone({
      url: `${req.url}`,
      headers,
      withCredentials: false
    });
    return next.handle(apiRequest);
  }

}
