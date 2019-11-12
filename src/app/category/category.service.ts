import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { ICategory } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }
  public storecategories: any;
  private _categoryServiceUrl = "http://ec2-18-224-109-141.us-east-2.compute.amazonaws.com:3000/";
  private categoryData = {
    "message": "Category Data",
    "status": 200,
    "categories": [
      {
        "category_id": "3",
        "category_name": "Grocery",
        "category_image_url": "",
        "sub_categories": [
          {
            "category_id": "17",
            "category_name": "Kitchen Staples",
            "category_image_url": "",
            "sub_categories": [
              {
                "category_id": "18",
                "category_image_url": "",
                "category_name": "Dal & Beans"
              },
              {
                "category_id": "19",
                "category_image_url": "",
                "category_name": "Masala & Spices"
              },
              {
                "category_id": "20",
                "category_image_url": "",
                "category_name": "Aata"
              },
              {
                "category_id": "21",
                "category_image_url": "",
                "category_name": "Sugar & Substitutes"
              }
            ]
          },
          {
            "category_id": "8",
            "category_image_url": "",
            "category_name": "Egg",
            "sub_categories": []
          },
          {
            "category_id": "12",
            "category_image_url": "",
            "category_name": "Biscuits",
            "sub_categories": []
          },
          {
            "category_id": "16",
            "category_image_url": "",
            "category_name": "Oil",
            "sub_categories": []
          }
        ]
      },
      {
        "category_id": "7",
        "category_name": "Milk Products",
        "category_image_url": "",
        "sub_categories": [
          {
            "category_id": "9",
            "category_name": "Curd",
            "category_image_url": "",
            "sub_categories": []
          },
          {
            "category_id": "10",
            "category_name": "Milk",
            "category_image_url": "",
            "sub_categories": []
          },
          {
            "category_id": "11",
            "category_name": "Yoghurt",
            "category_image_url": "",
            "sub_categories": []
          }
        ]
      },
      {
        "category_id": "6",
        "category_name": "Fruits & Vegetables",
        "category_image_url": "",
        "sub_categories": [
          {
            "category_id": "13",
            "category_name": "Fruits",
            "category_image_url": "",
            "sub_categories": []
          },
          {
            "category_id": "14",
            "category_name": "Vegetables",
            "category_image_url": "",
            "sub_categories": []
          },
          {
            "category_id": "15",
            "category_name": "Exotic Fruits",
            "category_image_url": "",
            "sub_categories": []
          }
        ]
      },
      {
        "category_id": "1",
        "category_name": "Meat",
        "category_image_url": "",
        "sub_categories": []
      },
      {
        "category_id": "2",
        "category_name": "Pan Shop",
        "category_image_url": "",
        "sub_categories": []
      },
      {
        "category_id": "4",
        "category_name": "Medical Store",
        "category_image_url": "",
        "sub_categories": []
      },
      {
        "category_id": "5",
        "category_name": "Pan Shop",
        "category_image_url": "",
        "sub_categories": []
      }
    ]
  };


  get storeCategories() : Observable<any>
  {
    if(this.storecategories)
    {
      return of(this.storecategories);
    }
    else
    {
      return this.getAllStoreCategory("");
    }
  }


  getAllStoreCategory(filterBy : any): Observable<any> {
    
    let obj = {};    
    obj['filterBy'] = filterBy;

    return this._http.post(`${this._categoryServiceUrl}categoryapi/storecategories/0`,obj).pipe(
      tap(data => {
        this.storecategories = data;
      })
      , map((storecategorydata) => {
        return storecategorydata
      })
      , catchError(this.handleError)
    )
  }
  //To fetch store category detail
  getStoreCategoryData(store_category_id): Observable<any> {
    let obj = {};
    obj['page_number'] = 1; obj['page_size'] = 20;obj['filterBy'] = '';
    return this._http.post(`${this._categoryServiceUrl}categoryapi/storecategories/${store_category_id}`,obj).pipe(
      tap(data => {
      })
      , map((storecategorydata) => {
        return storecategorydata;
      })
      , catchError(this.handleError)
    )
  }
  // to fetch all sub categories of store category
  getStoreSubCategoryData(category_id,filterBy): Observable<any> {
    let obj = {};
    obj['filterBy'] = filterBy;
    return this._http.post(`${this._categoryServiceUrl}categoryapi/storesubcategories/${category_id}`,obj).pipe(
      tap(data => {
      })
      , map((storesubcategorydata) => {
        return storesubcategorydata;
      })
      , catchError(this.handleError)
    )
  }

  // to fetch all sub category information
  getSubCategoryData(sub_category_id): Observable<any> {
    return this._http.get(`${this._categoryServiceUrl}categoryapi/subcategories/${sub_category_id}`).pipe(
      tap(data => {
      })
      , map((subcategorydata) => {
        return subcategorydata['store_sub_categories'];
      })
      , catchError(this.handleError)
    )
  }

  addNewStoreCategory(categorydata): Observable<any> {
    return this._http.post(`${this._categoryServiceUrl}categoryapi/storecategories`, categorydata).pipe(
      tap(data => {
        // console.log(JSON.stringify(data));
      }),
      map((data) => {
        return data;
      }),
      catchError(this.handleError)
    )
  }

  addNewStoreSubCategory1(subcategorydata): Observable<any> {
    console.log(subcategorydata);
    let obj = {};
    obj['store_category_id'] = subcategorydata['storeCategoryName'];
    obj['categoryName'] = subcategorydata['categoryName'];
    obj['status'] = subcategorydata['status'];
    obj['categoryRanking'] = subcategorydata['categoryRanking'];
    return this._http.post(`${this._categoryServiceUrl}categoryapi/storesubcategories`, obj).pipe(
      tap(data => {
      }),
      map((data) => {
        return data;
      }),
      catchError(this.handleError)
    )
  }

  editStoreCategory(categorydata, storeCategoryId): Observable<any> {
    let obj = {};
    obj['store_category_id'] = storeCategoryId;
    obj['store_category_name'] = categorydata['storeCategoryName'];
    obj['status'] = +categorydata['status'];
    obj['store_category_ranking'] = +categorydata['storeCategoryRanking'];

    return this._http.put(`${this._categoryServiceUrl}categoryapi/storecategories`, obj).pipe(
      tap(data => {
      }),
      map((data) => {
        return data;
      }),
      catchError(this.handleError)
    )
  }

  editStoreSubCategory(subcategorydata, categoryId): Observable<any>
  {
    console.log(subcategorydata);
    let obj = {};
    obj['category_id'] = +categoryId;
    obj['category_name'] = subcategorydata['categoryName'];
    obj['store_category_id'] = +subcategorydata['storeCategoryName'];
    obj['status'] = +subcategorydata['status'];
    obj['ranking'] = +subcategorydata['categoryRanking'];

    return this._http.put(`${this._categoryServiceUrl}categoryapi/storesubcategories`, obj).pipe(
      tap(data => {
      }),
      map((data) => {
        return data;
      }),
      catchError(this.handleError)
    ) 
  }

  getAllCategories(): Observable<any> {
    return of(this.categoryData);
  }

  initializeCategory() {

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
}
