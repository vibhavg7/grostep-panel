import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-merchant-info',
  templateUrl: './order-merchant-info.component.html',
  styleUrls: ['./order-merchant-info.component.css']
})
export class OrderMerchantInfoComponent implements OnInit {

  constructor(private _orderService:OrderService,private _activatedRoute :ActivatedRoute) { }
  merchantData : any = [];
  errorMessage:any;
  order_id :any;
  ngOnInit() {    
    this.order_id = this._activatedRoute.parent.snapshot.params['orderId'];
    this._orderService.fetchOrderDetails(this.order_id).subscribe(
      (data)=>{
        this.merchantData = data['storeInfo'][0];
      },
      (err)=>{
        this.errorMessage = err;
      }
    )
  }

}
