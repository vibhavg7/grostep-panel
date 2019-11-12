import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-invoice-info',
  templateUrl: './order-invoice-info.component.html',
  styleUrls: ['./order-invoice-info.component.css']
})
export class OrderInvoiceInfoComponent implements OnInit {

  constructor(private _orderService:OrderService,private _activatedRoute:ActivatedRoute) { }
  invoiceData : any = [];
  errorMessage:any;
  order_id :any;
  ngOnInit() {    
    this.order_id = this._activatedRoute.parent.snapshot.params['orderId'];
    this._orderService.fetchOrderDetails(this.order_id).subscribe(
      (data)=>{
        this.invoiceData = data['paymentInfo'][0];
      },
      (err)=>{
        this.errorMessage = err;
      }
    )
  }

}
