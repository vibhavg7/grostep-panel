import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail-info',
  templateUrl: './customer-detail-info.component.html',
  styleUrls: ['./customer-detail-info.component.css']
})
export class CustomerDetailInfoComponent implements OnInit {

  customerData: any;
  constructor(private _activatedRoute:ActivatedRoute,private _customerService:CustomerService) { }
  customerId : any = "";
  errorMessage:any = "";
  ngOnInit() {
    this.customerId = +this._activatedRoute.parent.params['_value']['customerId'];
    this._customerService.fetchCustomerInfoById(this.customerId).subscribe((data) => {      
      this.customerData = data['customer_info'][0];    
      console.log(this.customerData);  
    })
  }

}
