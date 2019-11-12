import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-addresses',
  templateUrl: './customer-addresses.component.html',
  styleUrls: ['./customer-addresses.component.css']
})
export class CustomerAddressesComponent implements OnInit {

  constructor(private _customerService:CustomerService,private _activatedRoute:ActivatedRoute) { }
  addresses : any = [];
  customerId :any;
  pageTitle : any = "Customer Saved Addresses";  
  ngOnInit() {
    this.customerId = +this._activatedRoute.parent.params['_value']['customerId'];
    this._customerService.fetchCustomerInfoById(this.customerId).subscribe((data) => {  
      // console.log(data);    
      this.addresses = data['customer_delivery_addresses'];    
      console.log(this.addresses);  
    })
  }

}
