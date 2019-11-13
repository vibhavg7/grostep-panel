import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-product-shell-detail',
  templateUrl: './product-shell-detail.component.html',
  styleUrls: ['./product-shell-detail.component.css']
})
export class ProductShellDetailComponent implements OnInit,OnDestroy {

  constructor(private _productService: ProductService,private modalService : NgbModal) { }
  // productData : IProduct;
  errorMessage : string;
  pageTitle : string = "Product Detail";
  productData : IProduct;
  sub:Subscription;
  image_url : any = "";
  product_id : any = "";
  // productData = this._productService._currentProduct;
  // get productData() : IProduct | null
  // {
  //   return this._productService._currentProduct;
  // }
  ngOnInit() {
    // console.log('product shell detail page');
    this.sub = this._productService.selectProductChanges$.subscribe((data)=>{
      if(data) 
      {
        this.image_url = data['image_url'];
        this.product_id = data['productId'];
      }
      this.productData = data;
    })
  }

  onRatingClicked(data)
  {

  }

  uploadImage()
  {
    // console.log(this.product_id);
    const modalRef = this.modalService.open(ImageUploadComponent);
    modalRef.componentInstance['title']= 'Image Upload';
    modalRef.componentInstance['image_type']= 'products';
    modalRef.componentInstance['id']= this.product_id;
    modalRef.componentInstance['productImage'].subscribe((data)=>{
      this.image_url = data['imageUrl'];
      // console.log(data);
    })
    // modalRef.componentInstance.title = 'Image Upload';
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }
}
