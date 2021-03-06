import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>
    {
        // console.log(`AddHeaderInterceptor - ${req.url}`);
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {            
            let jsonReq = req.clone({
                setHeaders:{
                    // 'Content-Type':'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
            // console.log(jsonReq);
            return next.handle(jsonReq);
        }
        let jsonReq = req.clone({
            setHeaders:{
                'Content-Type':'application/json',
            }
        });
        // console.log(jsonReq);
        return next.handle(jsonReq);
    }
}