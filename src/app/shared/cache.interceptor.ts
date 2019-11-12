import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpCacheService } from './http-cache.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor
{
    constructor(private _httpCacheService:HttpCacheService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        //pass along non cacheable request and invalidate cache
        if(req.method !== 'GET'){
            console.log(`Invalidating cache : ${req.method} ${req.url}`);
            this._httpCacheService.invalidateCache();
            next.handle(req);
        }

        const cachedResponse: HttpResponse<any> = this._httpCacheService.get(req.url);

        if(cachedResponse)
        {
            console.log(`Returning a cached response: ${cachedResponse.url}`);
            console.log(cachedResponse);
            return of(cachedResponse);
        }

        return next.handle(req).pipe(tap(event=>{
            if(event.type === HttpEventType.Response) {
                this._httpCacheService.put(req.url,event);
            }
        }));
        
    }
}