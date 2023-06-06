// checkout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckoutModel } from './checkout.model';
import { environment } from '../environments/environment';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = environment.urlCheckout;;

  constructor(private http: HttpClient) { }

  submitCheckoutForm(checkouDados: CheckoutModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}payment`, checkouDados);
  }

  processPayment() {
    return of({ success: true }).pipe(delay(2000));
  }
}
