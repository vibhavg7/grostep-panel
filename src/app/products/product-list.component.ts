import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';
@Component({
    // selector:'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string;
    imageWidth: number = 50;
    imageMargin: number = 2;
    includeDetails: boolean = true;
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    errorMessage: any;
    @ViewChild(CriteriaComponent, { static: false }) criteriaComponent: CriteriaComponent;
    constructor(private _productService: ProductService, private _router: Router,
        private _activatedRoute: ActivatedRoute, private _paramService: ProductParameterService) {

    }

    get ShowImage(): boolean {
        return this._paramService.showImage;
    }

    set ShowImage(value) {
        this._paramService.showImage = value;
    }

    ngOnInit() {
        this.pageTitle = this._activatedRoute.snapshot.data['pageTitle'];
        const productsData = this._activatedRoute.snapshot.data['products'];
        this.errorMessage = productsData['error'];

        this.onProductRetrieved(productsData.product);
        // console.log(this._paramService.filterBy);
    }

    ngAfterViewInit() {
        // console.log();
        this.criteriaComponent.listFilter = this._paramService.filterBy;
        // this.filterComponent.listFilter = this._paramService.filterBy;
    }

    onValueChange(value: any) {
        if (value != undefined) {
            this._paramService.filterBy = value;
            console.log(value);
            this.filteredProducts = this.performFilter(value);
        }
    }

    performFilter(value): IProduct[] {
        console.log(value);
        value = value.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(value) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = this.pageTitle + ':' + message;
    }

    toggleImage(): void {
        this.ShowImage = !this.ShowImage;
    }

    onProductRetrieved(productsData) {
        this.products = productsData.products;
        this.filteredProducts = this.products;

    }

    addProduct() {
        this._router.navigate(['/products', 0, 'edit']);
    }
}