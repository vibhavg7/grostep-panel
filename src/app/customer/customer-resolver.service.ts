import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerService } from './customer.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class CustomerResolverService implements Resolve<any>
{
    constructor(private _customerService: CustomerService)
    {
        
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._customerService.fetchAllCustomers(1,20,"")
        .pipe(
          map(customerResolver => (
            //   console.log(customerResolver),
              { customers: customerResolver['customers'],customer_total_count: customerResolver['customer_total_count']['customer_count'], error:'' })
            ),
          catchError(error => {
            const message = `Retrieval error: ${error}`;
            return of({ customers: null, error: message });
          })
        );
    }
}