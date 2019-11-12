import { Component, OnInit } from '@angular/core';
import { MerchantService } from './merchant.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ErrorTracker } from '../shared/errorTracker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadComponent } from 'src/app/products/image-upload/image-upload.component';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css']
})
export class MerchantDashboardComponent implements OnInit {

  searchCriteriaForm: FormGroup;
  constructor(private _merchantService: MerchantService, private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,private modalService : NgbModal) {
    this.searchCriteriaForm = this.formBuilder.group({
      searchCriteria: ['']
    });
  }

  pageTitle: any = "Stores Dashboard";
  store_total_count: any;
  displaytype: any = 'AM';
  stores: any = [];
  filterBy: any = '';
  currentPage: number = 1;
  pageSize: number = 20;
  errorMessage: any;
  imageWidth : number = 80;
  imageHeight : number = 80;
  imageMargin : number = 2;

  ngOnInit() {
    let resolvedData = this._activatedRoute.snapshot.data['resolvedMerchants'];

    if (resolvedData instanceof ErrorTracker) {
      this.errorMessage = resolvedData['errorMessage'];
    }
    else {
      this.store_total_count = resolvedData['store_total_count']['stores_count'];
      this.stores = resolvedData['store'];
    }
    console.log(this.stores);
   
    this.onChanges();
  }

  onChanges() {
    this.searchCriteriaForm.get('searchCriteria').valueChanges.pipe(tap(data => {
      // console.log(data);
    }), distinctUntilChanged(), debounceTime(200),
      switchMap(query => (this.filterBy = query, this._merchantService.fetchAllStores(this.currentPage, this.pageSize, query)))
    )
      .subscribe(res => { this.store_total_count = res['store_total_count']['stores_count']; this.stores = res['store']; })
  }

  uploadImage(store_id:any)
  {
    const modalRef = this.modalService.open(ImageUploadComponent);
    modalRef.componentInstance['title']= 'Image Upload';
    modalRef.componentInstance['id']= store_id;
    modalRef.componentInstance['image_type']= 'merchants';
    modalRef.componentInstance['productImage'].subscribe((data)=>{
      console.log(data);
      // this.stores.filter((cat) => cat['store_category_id'] == data['store_category_id'])['store_image_url'] = data['image_url'];
      // console.log(this.storeCategories);
    })
  }

  currentPageFn(page) {
    // console.log(page + "-" + this.filterBy+ "-"+this.pageSize);
    this._merchantService.fetchAllStores(page, this.pageSize, this.filterBy)
      .subscribe((data) => {
        this.store_total_count = data['store_total_count']['stores_count'];
        this.stores = data['store'];
        // console.log(this.store_total_count);
      })
  }

  onValueChange(filterBy) {
    // alert(filterBy);
    // console.log(filterBy);
    // this.filterBy = filterBy;
    // this._merchantService.searchStoreByName(this.currentPage,this.pageSize,this.filterBy)
    // .subscribe((data)=>{
    //   console.log(data);
    // })
  }

}
