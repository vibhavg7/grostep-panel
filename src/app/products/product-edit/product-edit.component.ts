import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  errorMessage: any;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }
  
  pageTitle: any = "Product Edit";
  productData: any;
  categoryData: any;
  private orignalProduct:IProduct;
  private currentProduct:IProduct;
  // product_id : any;

  get product() {
    return this.currentProduct;
  }

  set product(value :IProduct){
    this.currentProduct = value;
    this.orignalProduct = {...value};
  }

  get isDirty() : boolean
  {
    return JSON.stringify(this.currentProduct) !== JSON.stringify(this.orignalProduct);
  }

  reset()
  {
    this.currentProduct =  null;
    this.orignalProduct =  null;

  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.productData = data['productData'];
      this.categoryData = data['categoryData'];
      console.log(this.productData);
      this.errorMessage = this.productData.error + ' ' + this.categoryData.error;
      this.onProductRetrieved(this.productData.product);
    });
  }

  onProductRetrieved(product: any) {
    this.product = product;
    if (!this.product) {
      this.pageTitle = 'No Product Found';
    } else {
      if (this.product.productId === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
    // console.log(this.product);
  }

  onDeleteProduct() : any
  {
    if(this.product.productId == 0)
    {
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else{
      this.productService.deleteProduct(this.product.productId).subscribe({
        next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
        error: err => this.errorMessage = err
      });
    }

  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  onSaveComplete(message: string) {
    console.log(message);
    this.reset();
    this.router.navigate(['/products']);
  }

  onSave()
  {
    console.log(this.product);
    if(this.product.productId == 0) {
      console.log(this.product);
      this.productService.createProduct(this.product).subscribe((data)=>{
        this.onSaveComplete(`The new ${this.product.productName} was saved`)
      },(error)=>{
        this.errorMessage = error
      })
    } 
    else {
      this.productService.updateProduct(this.product,'').subscribe((data)=>{
        this.onSaveComplete(`The new ${this.product.productName} was updated`)
      },(error)=>{
        this.errorMessage = error
      })
    }
  }

}
