import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-shell-list',
  templateUrl: './product-shell-list.component.html',
  styleUrls: ['./product-shell-list.component.css']
})
export class ProductShellListComponent implements OnInit, OnDestroy {

  filterBy: any = "";
  searchCriteriaForm: FormGroup;
  constructor(private _productService: ProductService,
    private router: Router, private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute) {
    this.searchCriteriaForm = this.formBuilder.group({
      searchCriteria: ['']
    });
  }

  products: IProduct[];
  pageTitle: string = "Products Listing";
  errorMessage: any;
  selectedProduct: IProduct | null;
  sub: Subscription;
  productsCount: number = 0;
  totalPages: number;
  Pages: any = [];
  currentPage : any;
  pageSize:number =20;
  ngOnInit() {
    this.currentPage = 1;
    
    this.sub = this._productService.selectProductChanges$.subscribe((data) => {
      this.selectedProduct = data;
    });

    let productsData = this._activatedRoute.snapshot.data['products']['product'];
    this.productsCount = +this._activatedRoute.snapshot.data['products']['product_total_count'];
    this.onProductRetrieved(productsData);
    this.onChanges();
  }

  onChanges() {
    this.searchCriteriaForm.get('searchCriteria').valueChanges.pipe(tap(data => {
    }), distinctUntilChanged(), debounceTime(200),
      switchMap(query => (this.filterBy = query, this._productService.getProducts(this.currentPage, this.pageSize, query)))
    )
      .subscribe(res => { console.log(res); this.onProductRetrieved(res['products']),this.productsCount = res['productCount']; })
  }

  currentPageFn(page) {    
    this.currentPage = page;
    this._productService.getProducts(this.currentPage, this.pageSize,this.filterBy)
      .subscribe((data) => {
        this.onProductRetrieved(data['products']);
      })
  }


  onSelected(product) {
    this._productService.changeSelectedProduct(product);
  }

  onProductRetrieved(productsData) {
    this.products = productsData;
  }

  addProduct() {
    this.router.navigate(['products', '0', 'edit']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
