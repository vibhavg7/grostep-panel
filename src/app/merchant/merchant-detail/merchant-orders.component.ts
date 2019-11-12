import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MerchantService } from '../merchant.service';
import { ActivatedRoute } from '@angular/router';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchantOrderProductListComponent } from './merchant-order-product-list.component';
// import { ImageUploadComponent } from '../../products/image-upload/image-upload.component';

@Component({
  selector: 'app-merchant-orders',
  templateUrl: './merchant-orders.component.html',
  styleUrls: ['./merchant-orders.component.css']
})
export class MerchantOrdersComponent implements OnInit {

  storeId: number;
  pageTitle: any = "Merchant Orders";
  store_order_total_count: any;
  displaytype: any = 'AM';
  storeOrders: any = [];
  filterBy: any = '';
  currentPage: number = 1;
  pageSize: number = 20;

  searchCriteriaForm: FormGroup;
  constructor(private _merchantService: MerchantService, private formBuilder: FormBuilder, 
    private _activatedRoute: ActivatedRoute,private modalService : NgbModal) {
    this.searchCriteriaForm = this.formBuilder.group({
      searchCriteria: ['']
    });
  }

  ngOnInit() {
    this.storeId = +this._activatedRoute.parent.params['_value']['storeId'];
    this._merchantService.fetchAllStoreOrders(this.storeId, this.currentPage, this.pageSize, "").subscribe((data) => {     
      this.store_order_total_count = data['store_order_count'][0]['store_orders_count'];
      this.storeOrders = data['store_orders_info'];
      console.log(this.storeOrders[0]);
    })
    this.onChanges();
  }

  ViewOrderedProducts(order_id:any)
  {
    const modalRef = this.modalService.open(MerchantOrderProductListComponent);
    modalRef.componentInstance['title']= 'View Products';
    modalRef.componentInstance['order_id']= order_id;
  }

  onChanges() {
    this.searchCriteriaForm.get('searchCriteria').valueChanges.pipe(tap(data => {
    }), distinctUntilChanged(), debounceTime(200),
      switchMap(query => (this.filterBy = query, this._merchantService.fetchAllStoreOrders(this.storeId, this.currentPage,
        this.pageSize, query)))
    )
      .subscribe(res => {
        this.store_order_total_count = res['store_order_count'][0]['store_orders_count'];
        this.storeOrders = res['store_orders_info'];
      })
  }

  currentPageFn(page) {
    console.log(page);
    this._merchantService.fetchAllStoreOrders(this.storeId, page, this.pageSize, this.filterBy)
      .subscribe((data) => {        
        this.storeOrders = data['store_orders_info'];
      })
  }

}
