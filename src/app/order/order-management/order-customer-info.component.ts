import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../order/order.service';

@Component({
  selector: 'app-order-customer-info',
  templateUrl: './order-customer-info.component.html',
  styleUrls: ['./order-customer-info.component.css']
})
export class OrderCustomerInfoComponent implements OnInit {

  constructor(private _orderService:OrderService,private _activatedRoute :ActivatedRoute ) { }
  customerData : any = [];
  errorMessage:any;
  order_id :any;
  ngOnInit() {    
    this.order_id = this._activatedRoute.parent.snapshot.params['orderId'];
    this._orderService.fetchOrderDetails(this.order_id).subscribe(
      (data)=>{
        this.customerData = data['customerInfo'][0];
        console.log(data);
      },
      (err)=>{
        this.errorMessage = err;
      }
    )
  }

}
