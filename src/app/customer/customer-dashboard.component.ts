import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  searchCriteriaForm: FormGroup;
  pageTitle: any = "Customers Dashboard";
  total_customer_count: any;
  displaytype: any = 'AM';
  customers: any = [];
  filterBy: any = '';
  currentPage: number = 1;
  pageSize: number = 20;

  constructor(private _customerService: CustomerService, private formBuilder: FormBuilder) {
    this.searchCriteriaForm = this.formBuilder.group({
      searchCriteria: ['']
    });
  }

  ngOnInit() {
    this._customerService.fetchAllCustomers(this.currentPage, this.pageSize, this.filterBy).subscribe((data) => {
      console.log(data);
      this.total_customer_count = data['customer_total_count']['customer_count'];      
      this.customers = data['customers'];
    })
    this.onChanges();
  }

  onChanges() {
    this.searchCriteriaForm.get('searchCriteria').valueChanges.pipe(tap(data => {
    }), distinctUntilChanged(), debounceTime(200),
      switchMap(query => (this.filterBy = query, this._customerService.fetchAllCustomers(this.currentPage, this.pageSize, query)))
    )
      .subscribe(res => { this.total_customer_count = res['customer_total_count']['customer_count']; 
            this.customers = res['customers']; })
  }

  currentPageFn(page) {
    // console.log(page + "-" + this.filterBy+ "-"+this.pageSize);
    this._customerService.fetchAllCustomers(page, this.pageSize, this.filterBy)
      .subscribe((data) => {
        this.total_customer_count = data['customer_total_count']['customer_count'];
        this.customers = data['customers'];
        // console.log(this.store_total_count);
      })
  }

}
