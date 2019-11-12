import { Component, OnInit } from '@angular/core';;
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../../merchant/merchant.service';

@Component({
  selector: 'app-order-product-info',
  templateUrl: './order-product-info.component.html',
  styleUrls: ['./order-product-info.component.css']
})
export class OrderProductInfoComponent implements OnInit {

  constructor(private _merchantService : MerchantService,private _activatedRoute:ActivatedRoute) { }
  order_id : any;
  orderProducts :any = [];
  errorMessage :any;
  pageTitle = "Order Products"
  ngOnInit() {
    this.order_id = this._activatedRoute.parent.snapshot.params['orderId'];
    this.orderProducts = this._activatedRoute.snapshot.data['resolvedProducts']['orderProducts'];
    this.errorMessage = this._activatedRoute.snapshot.data['resolvedProducts']['error'];
   
  }

}
