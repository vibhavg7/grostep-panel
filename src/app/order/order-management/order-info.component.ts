import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  constructor(private _orderService:OrderService,private _activatedRoute :ActivatedRoute) { }
  order_id : any;
  errorMessage :any;
  ngOnInit() {
    this.order_id = this._activatedRoute.parent.snapshot.params['orderId'];
    this._orderService.fetchOrderDetails(this.order_id).subscribe(
      (data)=>{
        console.log(data);
      },
      (err)=>{
        this.errorMessage = err;
      }
    )
  }

}
