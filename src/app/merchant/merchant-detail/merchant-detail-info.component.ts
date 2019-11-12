import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadComponent } from '../../products/image-upload/image-upload.component';

@Component({
  selector: 'app-merchant-detail-info',
  templateUrl: './merchant-detail-info.component.html',
  styleUrls: ['./merchant-detail-info.component.css']
})
export class MerchantDetailInfoComponent implements OnInit {

  merchantData: any;
  storeId: number;
  constructor(private _merchantService: MerchantService,
    private modalService : NgbModal,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.storeId = +this._activatedRoute.parent.params['_value']['storeId'];
    this._merchantService.fetchAllStoreById(this.storeId).subscribe((data) => {
      this.merchantData = data['store'][0];
      // console.log(this.merchantData);
    })
  }

  uploadImage(store_id:any)
  {
    const modalRef = this.modalService.open(ImageUploadComponent);
    modalRef.componentInstance['title']= 'Image Upload';
    modalRef.componentInstance['id']= store_id;
    modalRef.componentInstance['image_type']= 'merchants';
    modalRef.componentInstance['productImage'].subscribe((data)=>{
      console.log(data);
      console.log(this.merchantData);
      this.merchantData['image_url'] = data['image_url'];
      // this.merchantData.filter((cat) => cat['store_id'] == data['store_id'])['image_url'] = data['image_url'];
      // console.log(this.storeCategories);
    })
  }

}
