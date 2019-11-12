import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit-info',
  templateUrl: './product-edit-info.component.html',
  styleUrls: ['./product-edit-info.component.css']
})
export class ProductEditInfoComponent implements OnInit {

  constructor(private route:Router,private _activatedRoute:ActivatedRoute) { }

  product:IProduct; 

  ngOnInit() {
    this._activatedRoute.parent.data.subscribe((data)=>{
      this.product = data['productData'].product;      
      console.log(this.product);
    })

  }

}
