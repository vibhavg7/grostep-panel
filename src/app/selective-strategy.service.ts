import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectiveStrategyService implements PreloadingStrategy {
    preload(route: Route,load: Function): Observable<any> {
       if(route.data && route.data['preload'])
       {
           return load();
       }
       else
        return of(null);
    }
}