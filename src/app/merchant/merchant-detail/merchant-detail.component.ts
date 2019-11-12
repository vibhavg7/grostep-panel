import { Component, OnInit } from '@angular/core';
// import { MerchantService } from '../merchant.service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css']
})
export class MerchantDetailComponent implements OnInit {

  storeId: number;
  merchantData: any = [];
  pageTitle: any ="Store Detail";
  constructor() { }

  ngOnInit() {
    // this.storeId = +this._activatedRoute.snapshot.params['storeId'];
    // console.log(this.storeId);
    // this._merchantService.fetchAllStoreById(this.storeId).subscribe((data)=>{
    //   // console.log(data);
    //   this.merchantData = data['store'][0];
    //   console.log(this.merchantData);
    // })
  }

}
