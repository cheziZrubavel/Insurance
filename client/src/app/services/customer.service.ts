// import { RootObject } from './../models/RootObject';
import { CustomerModel } from './../models/customer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public postCustomerDetails(credentials: CustomerModel): Observable<Object> {
    return this.http.post<Object>("https://ibell.frb.io/api/test/getJson", credentials);
  };

  public premiaMoreThan50(credentials: CustomerModel): Observable<Object> {
    return this.http.post<Object>("https://ibell.frb.io/zapier/add/lead/31198", credentials);
  }

  public premiaLessThan50(credentials: CustomerModel): Observable<Object> {
    return this.http.post<Object>("https://ibell.frb.io/zapier/add/lead/38754", credentials);
  }
}
