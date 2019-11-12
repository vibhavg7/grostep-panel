import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  
  canDeactivate(component: ProductEditComponent, currentRoute: ActivatedRouteSnapshot, 
                currentState: RouterStateSnapshot, 
                nextState?: RouterStateSnapshot) : boolean| Observable<boolean> | Promise<boolean>
  {
    if(component.isDirty)
    {
      // console.log('Dirty');
      // return true;
    }
    console.log('fhhfhfhfhf');
    return true;
  }
  
}
