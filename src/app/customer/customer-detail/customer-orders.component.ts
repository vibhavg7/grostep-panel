import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchantOrderProductListComponent } from '../../merchant/merchant-detail/merchant-order-product-list.component';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  searchCriteriaForm: FormGroup;
  customerOrders: any = [];
  order_total_count: any;
  customerId : any = "";
  pageTitle: any = "Merchant Orders";
  filterBy: any = '';
  errorMessage:any = "";
  currentPage: number = 1;
  pageSize: number = 20;
  constructor(private _activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,
              private _customerService:CustomerService,private modalService:NgbModal) { 
    this.searchCriteriaForm = this.formBuilder.group({
      searchCriteria: ['']
    });
  }

  ViewOrderedProducts(order_id:any)
  {
    const modalRef = this.modalService.open(MerchantOrderProductListComponent);
    modalRef.componentInstance['title']= 'View Products';
    modalRef.componentInstance['order_id']= order_id;
  }
 
  ngOnInit() {
    this.customerId = +this._activatedRoute.parent.params['_value']['customerId'];
    this._customerService.fetchAllCustomerOrders(this.customerId, this.currentPage, this.pageSize, "").subscribe((data) => {     
      this.order_total_count = data['customer_order_count'][0]['customer_orders_count'];
      this.customerOrders = data['customer_orders_info'];
      console.log(this.customerOrders);
      console.log(this.order_total_count);
    })
    this.onChanges();
  }

  onChanges() {
    this.searchCriteriaForm.get('searchCriteria').valueChanges.pipe(tap(data => {
    }), distinctUntilChanged(), debounceTime(200),
      switchMap(query => (this.filterBy = query, this._customerService.fetchAllCustomerOrders(this.customerId, this.currentPage,
        this.pageSize, query)))
    )
      .subscribe(data => {
        this.order_total_count = data['customer_order_count'][0]['customer_orders_count'];
        this.customerOrders = data['customer_orders_info'];
      })
  }

  currentPageFn(page) {
    console.log(page);
    this._customerService.fetchAllCustomerOrders(this.customerId, page, this.pageSize, this.filterBy)
      .subscribe((data) => {        
        this.customerOrders = data['customer_orders_info'];
      })
  }
}
