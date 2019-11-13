import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http:HttpClient) { }
    
  private _customerServiceUrl = "http://ec2-18-224-109-141.us-east-2.compute.amazonaws.com:3000/customerapi/";
  customerData : any;
  customer_delivery_addresses : any;

  fetchAllCustomers(page_number: number, page_size: any,filterBy : any): Observable<any> {
    // if (this.custom) {
    //   return of(this.stores);
    // }
    let obj = {};
    obj['page_number'] = page_number; obj['page_size'] = page_size;obj['filterBy'] = filterBy;
    
    return this._http.post<any[]>(`${this._customerServiceUrl}customerinfo`,obj)
      .pipe(
        tap(data => {
          // console.log(JSON.stringify(data))
        })
        , map((data) => {
            return data;        
        })
        , catchError(this.handleError)
      );
  }

  fetchAllCustomerOrders(customerId:number,page_number: number, page_size: number,filterBy:any)
  {  
    let obj = {};
    obj['page_number'] = page_number; obj['page_size'] = page_size; obj['customerId'] = customerId;
    obj['filterBy'] = filterBy;

    // console.log(obj);
    
    return this._http.post<any[]>(`${this._customerServiceUrl}/customerinfo/customerorders`,obj)
      .pipe(
        tap(data => {          
          console.log(data);
        })
        , map((data) => {
            return data;
        })
        , catchError(this.handleError)
      );
  }

  fetchCustomerInfoById(customerId:any) : Observable<any>
  {
    if(this.customerData)
    {
      return of(this.customerData);
    }
    // let getHeaders = new HttpHeaders({
    //   'Accept':'application/json',
    //   'Authorization':'my-key'
    // })
    // ,{
    //   headers:getHeaders
    // }
    return this._http.get(`${this._customerServiceUrl}customerinfo/${customerId}`).pipe(
      tap(data => { 
        this.customerData = data;
      })
      , map((customerData) => {
        return customerData;
      })
      , catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    // console.error(errorMessage);
    return throwError(errorMessage);
  }
}
