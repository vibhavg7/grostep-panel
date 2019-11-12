import { CanActivate,Router, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class ProductDetailGuard implements CanActivate {

    constructor(private router : Router) {

    }
    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot) :boolean | Observable<boolean> {
        let id = +next.url[1].path;
        if(isNaN(id) || id <1)
        {
            alert('Invalid product id');
            this.router.navigate(['/products']);
            return false;
        }
        return true;

    }

}