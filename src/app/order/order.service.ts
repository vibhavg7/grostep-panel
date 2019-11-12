import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { ErrorTracker } from '../shared/errorTracker';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }
  private _orderService : any = 'http://ec2-18-224-109-141.us-east-2.compute.amazonaws.com:3000/orderapi/';
  public orderDetails : any = '';

 
  fetchOrderDetails(orderId) : Observable<any>
  {
    if(this.orderDetails)
    {      
      return of(this.orderDetails);
    }
    return this._http.get<any>(`${this._orderService}${orderId}`).pipe(
      tap(data => {
      })
      , map((data) => {
          this.orderDetails = data;
          return data;
      })
      , catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse) :Observable<ErrorTracker> {
    
    let dataError = new ErrorTracker();
    dataError.errorNumber = 100;
    dataError.errorMessage =`Server returned code: ${err.status}, error message is: ${err.message}`;
    dataError.friendlyMessage = "An error retriving data";
    return throwError(dataError);
  }
}
