import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoryService } from './category.service';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<any> {

  constructor(private _categoryService: CategoryService) { }

  resolve(_activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    let id =  _activatedRouteSnapshot.paramMap.get('id');

    return this._categoryService.getStoreSubCategoryData(id,"")
      .pipe(
        tap(data => {
          // console.log(JSON.stringify(data));
        }),
        map(storesubcategorydata => ({ storesubcategorydata: storesubcategorydata['store_sub_categories'], error: '' })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          return of({ storesubcategorydata: null, error: message });
        })
      );
  }


}
