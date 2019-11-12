import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-merchant-order-product-list',
  templateUrl: './merchant-order-product-list.component.html',
  styleUrls: ['./merchant-order-product-list.component.css']
})
export class MerchantOrderProductListComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private _http: HttpClient,private _merchantService:MerchantService) { }

  title: any = "";
  order_id :any ="";
  orderProducts :any = [];
  ngOnInit() {
    this._merchantService.fetchOrderProducts(this.order_id).subscribe(
      (data) =>{
        this.orderProducts = data['order_products_info'];
        console.log(this.orderProducts);
      },
      (err)=>{

      }
    )
  }

}
