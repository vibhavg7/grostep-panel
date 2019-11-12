import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import { CategoryService } from './category.service';
import { map,catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class StoreCategoryResolver implements Resolve<any>
{
    constructor(private categoryService:CategoryService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this.categoryService.getAllStoreCategory("")
        .pipe(
            map(storeCategoryResolver => (
                // console.log(storeCategoryResolver),
                { categories: storeCategoryResolver['store_categories'],error:'' }
            )),
            catchError(error => {
              const message = `Retrieval error: ${error}`;
            //   console.log(message);
              return of({ categories: null, error: message });
            })
          );
    }   
}