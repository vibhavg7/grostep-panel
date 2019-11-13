import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    get isLoggedIn() {
        // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // return (!!currentUser) ? true : false;
        return !! localStorage.getItem('currentUser');
    }
    // currentUser: User;
    redirectUrl: any;
    _authURL: any = "http://ec2-18-224-109-141.us-east-2.compute.amazonaws.com:3000/employeeapi/";

    constructor(private _http: HttpClient) {

    }
    login(employee): Observable<any> {

        const url = `${this._authURL}${'validate'}`;
        // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // console.log(employee);
        return this._http.post(url, employee).pipe(
            tap(user => {
                if (user['status'] == 200 && user['employeeData'] != []) {
                    localStorage.setItem('currentUser', JSON.stringify(user['employeeData'][0]));
                }
                // console.log(localStorage.getItem('currentUser'));
            }, map((data) => {
                console.log(data);
                return data;
                
                // this.currentUser = data["employeeData"][0];
            })),
            catchError(this.handleError)
        )
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}