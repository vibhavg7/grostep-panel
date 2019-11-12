import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MerchantService } from './merchant.service';
import { ErrorTracker } from '../shared/errorTracker';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn:'root'
})
export class MerchantResolverService implements Resolve<any>
{
    constructor(private _merchantService:MerchantService)
    {

    }
    page_number: number = 1; page_size: number = 20;filterBy : string = "";

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any>
    {
        return this._merchantService.fetchAllStores(this.page_number,this.page_size,this.filterBy).pipe(
            catchError(err=> of(err))
        );
    }
}
