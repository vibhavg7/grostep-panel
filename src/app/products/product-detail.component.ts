import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResolved } from './product-resolved';

@Component({
  // selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private _productService: ProductService, private router: Router,
    private _activatedRoute: ActivatedRoute) {

  }

  pageTitle: string;
  productId: number;
  errorMessage: any;
  productData: IProduct;

  onBack() {
    this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
  }

  onEdit() {
    this.router.navigate(['products', this.productId, 'edit']);
  }
  ngOnInit() {
    const productData: any =
      this._activatedRoute.snapshot.data['product'];
    this.errorMessage = productData.error;
    this.onProductRetrieved(productData.product);    
  }

  onRatingClicked(data){
    console.log(data);
  }

  onProductRetrieved(product: IProduct): void {
    this.productData = product;
    if (this.productData) {
      this.pageTitle = `Product Detail: ${this.productData.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

}
