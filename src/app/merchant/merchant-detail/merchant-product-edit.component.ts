import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../products/product.service';
import { MerchantService } from '../merchant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-merchant-product-edit',
  templateUrl: './merchant-product-edit.component.html',
  styleUrls: ['./merchant-product-edit.component.css']
})
export class MerchantProductEditComponent implements OnInit {

  storeId: number;
  errorMessage: any;
  submitted: boolean;
  results: any;
  addStoreProductForm: any;
  selectedProduct: any = '';
  productValueSet: boolean = false;
  storeProductId : any;
  sub: any;
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute:ActivatedRoute,
    private _productService: ProductService,
    private _merchantService: MerchantService
  ) {
    this.addStoreProductForm = this.formBuilder.group({
      storeproductName: ['', Validators.required],
      productMarkedPrice: ['', Validators.required],      
      productCostPrice: ['', Validators.required],
      productSellingPrice: ['', Validators.required],
      storeMargin: ['', Validators.required],
      storeDiscount: ['', Validators.required],
      // storeQuantity: ['', Validators.required],
      status: ['']
    });
  }

  get f() { return this.addStoreProductForm.controls; }

  ngOnInit() {    
    this.storeId = +this._activatedRoute.snapshot.params['storeId'];
    this.storeProductId = +this._activatedRoute.snapshot.params['productId'];
    this.onChanges();

  }

  onChanges() {
    this.addStoreProductForm.get('storeproductName').valueChanges.pipe(tap(data => {
      console.log(data);
    }), distinctUntilChanged(), debounceTime(200),
      switchMap(query => !this.productValueSet ? (this._productService.searchProducts(query)) : (this.productValueSet = false, of([]))
      ))
    .subscribe(res => { this.results = res; })
  }

  onSubmit() {
    console.log(this.addStoreProductForm.value);
    this.submitted = true;
    if (this.addStoreProductForm.invalid) {
      return;
    }

    if (this.storeProductId == 0) {      
      this._merchantService.addStoreProducts(this.addStoreProductForm.value,this.selectedProduct['product_id'],this.storeId)
      .subscribe((data) => {
        console.log(data);
        if (data.status == 200) {
          this._router.navigate([`merchant/${this.storeId}/merchantproducts`]);
          // this._router.navigate(['merchant/',this.storeId,'/merchantproducts']);
        }
        if (data.status == "400") {
          alert('Category Not Added . Internal Server Error');
        }
      },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
    // else {
    //   console.log(this.addStoreProductForm.value);
    //   // this._categoryService.editStoreCategory(this.addStoreCategoryForm.value,this.storeCategoryId);
    //   this._merchantService.editStoreProducts(this.addStoreProductForm.value,this.selectedProduct['product_id'], this.storeProductId)
    //   .subscribe((data) => {
    //     console.log(data);
    //     if (data.status == "200") {
    //       this._router.navigate(['category/storecategories']);
    //     }
    //     if (data.status == "400") {
    //       alert('Category Not Added . Internal Server Error');
    //     }
    //   },
    //     (error) => {
    //       this.errorMessage = error;
    //     })
    // }


  }

  productSelected(product) {
    this.results = [];
    this.productValueSet = true;    
    this.selectedProduct = product;    
    this.addStoreProductForm.get('storeproductName').setValue(this.selectedProduct['product_name']);
  }

}
