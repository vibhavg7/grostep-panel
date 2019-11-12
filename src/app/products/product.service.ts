import { Injectable, OnDestroy } from '@angular/core';
import { IProduct } from './product';
import { Observable, throwError, of, Subject, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { ProductResolved } from './product-resolved';

@Injectable(
    { providedIn: 'root' }
)
export class ProductService implements OnDestroy {
    private _productServiceUrl = "http://ec2-18-224-109-141.us-east-2.compute.amazonaws.com:3000/productsapi/";
    private products: IProduct[];
    public productResolved: ProductResolved;
    private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
    selectProductChanges$ = this.selectedProductSource.asObservable();

    constructor(private _http: HttpClient) {
        // console.log('product service constructor');
        this.productResolved = new ProductResolved();
    }

    ngOnDestroy() {
        // console.log('product service ngOnDestroy constructor');
    }

    changeSelectedProduct(product: IProduct) {
        this.selectedProductSource.next(product);
    }

    getProducts(page_number: number, page_size: number,filterBy:any): Observable<any> {
        if (this.products) {
            return of(this.products);
        }
        let obj = {};
        obj['page_number'] = page_number; obj['page_size'] = page_size;obj['filterBy'] = filterBy;

        return this._http.post(`${this._productServiceUrl}fetchProducts`,obj)
            .pipe(
                tap(data => {
                    // console.log(JSON.stringify(data)) 
                })
                , map((data) => {
                    this.productResolved.products = data['products'];
                    this.productResolved.productCount = data['products_total_count']['products_count'];
                    // console.log(this.productResolved);   
                    // return this.products = data['products'];
                    // console.log(data['products']);
                    // return this.products = data['products'];
                    return this.productResolved;

                })
                , catchError(this.handleError)
            );
    }

    searchProducts(queryString: any): Observable<any> {
        if (queryString != '') {
            return this._http.get<any[]>(`${this._productServiceUrl}productsearch/${queryString}`)
                .pipe(
                    tap(data => {
                        // console.log(JSON.stringify(data))
                    })
                    , map((data) => {
                        return data['products'];

                    })
                    , catchError(this.handleError)
                );
        }
        console.log(queryString);
        return of([]);
    }


    deleteProduct(product_id: any): any {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this._productServiceUrl}${product_id}`;
        return this._http.delete(url, { headers }).pipe(
            tap(data => {
                // console.log(JSON.stringify(data)) 
            }),
            catchError(this.handleError)
        )
    }

    updateProduct(product: IProduct, productId: any): Observable<any> {
        // console.log(product);
        let obj = {};
        obj['product_id'] = productId;
        obj['product_name'] = product['productName'];
        obj['product_price'] = product['productPrice'];
        obj['weight_type'] = product['productWeightType'];
        obj['product_code'] = product['productCode'];
        obj['product_description'] = product['productDescription'];
        obj['product_rating'] = product['productRating'];
        obj['status'] = product['status'];
        obj['product_weight'] = +product['productWeight'];
        obj['category_id'] = product['subCategoryName'];
        console.log(obj);
        const url = `${this._productServiceUrl}${productId}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.put(url, obj, { headers }).pipe(
            tap(data => {
                console.log(JSON.stringify(data))
            }),
            // map(()=>),
            catchError(this.handleError)
        )
    }

    createProduct(product: any): Observable<any> {
        // console.log(product);
        let obj = {};
        obj['product_name'] = product['productName'];
        obj['product_price'] = +product['productPrice'];
        obj['weight_type'] = +product['productWeightType'];
        obj['category_id'] = product['subCategoryName'];
        obj['product_code'] = product['productCode'];
        obj['product_description'] = product['productDescription'];
        obj['product_rating'] = +product['productRating'];
        obj['status'] = +product['status'];
        obj['product_weight'] = +product['productWeight'];
        console.log(obj);
        const url = `${this._productServiceUrl}`;
        // console.log(url);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post(url, obj, { headers }).pipe(
            tap(data => {
                // console.log(JSON.stringify(data)) 
            }),
            map((data) => {
                return data;
            }),
            catchError(this.handleError)
        )
    }

    getcategoryProductInfo(category_id): Observable<any> {
        let methodType = 'category/';

        return this._http.get<any[]>(`${this._productServiceUrl}${methodType}${category_id}`)
            .pipe(
                tap(data => { console.log(JSON.stringify(data)) })
                , catchError(this.handleError)
            );
    }

    getProduct(productId: number): Observable<IProduct> {
        if (productId == 0) {
            return of(this.initializeProduct());
        }
        console.log(productId);
        // if (this.products && this.products.length > 0) {
        //     let foundItem: IProduct = this.products.find(p => p.productId == productId);
        //     console.log(foundItem);
        //     if (foundItem) {
        //         return of(foundItem);
        //     }
        // }

        return this._http.get<any[]>(`${this._productServiceUrl}${productId}`)
            .pipe(
                tap(data => {
                    // console.log(JSON.stringify(data));
                })
                , map((productdata) => {
                    return productdata['product']
                })
                , catchError(this.handleError)
            );
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
        // console.error(errorMessage);
        return throwError(errorMessage);
    }

    private initializeProduct(): IProduct {
        // Return an initialized object
        return {
            productId: 0,
            productName: null,
            productCode: null,
            releaseDate: null,
            lastUpdated: null,
            price: null,
            description: null,
            starRating: null,
            categoryName: null,
            available: null,
            //   tags: [],
            imageUrl: null
        };
    }
}