import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { IProduct } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class ProductsResolverService implements Resolve<any>
{
    constructor(private _productDataService:ProductService) { }
    resolve(_activatedRouteSnapshot:ActivatedRouteSnapshot,state:RouterStateSnapshot) : Observable<any>
    {        
        return this._productDataService.getProducts(1,20,"")
        .pipe(
          map(productResolver => (
              console.log(productResolver),
              { product: productResolver['products'],product_total_count: productResolver['productCount'], error:'' })
            ),
          catchError(error => {
            const message = `Retrieval error: ${error}`;
            return of({ product: null, error: message });
          })
        );
    }
}