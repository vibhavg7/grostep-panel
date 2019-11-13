import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, tap, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-merchant-products-catalog',
  templateUrl: './merchant-products-catalog.component.html',
  styleUrls: ['./merchant-products-catalog.component.css']
})
export class MerchantProductsCatalogComponent implements OnInit {

  filterBy: any = "";
  searchCriteriaForm: FormGroup;
  storeId: number;
  currentPage : number = 1;
  pageSize: number = 20;
  store_products_info : any = [];
  store_products_count : any;
  showImage : any = false;
  displaytype: any = 'SP';
  errorMessage :any = "";
  constructor(private _merchantService:MerchantService,private _activatedRoute:ActivatedRoute,private formBuilder:FormBuilder) {
    this.searchCriteriaForm = this.formBuilder.group({
      searchCriteria: ['']
    });
   }

  ngOnInit() {
    this.storeId = +this._activatedRoute.parent.params['_value']['storeId'];
    this._merchantService.fetchStoreProducts(this.storeId,this.currentPage,this.pageSize,"").subscribe((data)=>{
      this.store_products_info = data['store_products_info'];
      console.log(this.store_products_info)
      this.store_products_count = data['store_products_count'][0]['store_products_count'];      
    })    
    this.onChanges();
  }

  updateProductStock(event)
  {
    console.log(event.target);
  }

  onChanges()
  {
    this.searchCriteriaForm.get('searchCriteria').valueChanges.pipe(tap(data => {
    }), distinctUntilChanged(), debounceTime(200),
      switchMap(query => ( this.filterBy = query,this._merchantService.fetchStoreProducts(this.storeId,this.currentPage, this.pageSize,query)))
      )
    .subscribe(res => { this.store_products_count = res['store_products_count'][0]['store_products_count'];console.log(res); this.store_products_info = res['store_products_info']; })
  }

  currentPageFn(page){
    // console.log(page);
    this._merchantService.fetchStoreProducts(this.storeId,page, this.pageSize,this.filterBy)
      .subscribe((data) => {
        // this.store_products_count = data['store_products_count'][0]['store_products_count'];
        this.store_products_info = data['store_products_info'];
        // console.log(this.stores);
      })
  }

}
