import { Component, OnInit } from '@angular/core';
import { MerchantService } from './merchant.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationServiceService } from '../shared/location-service.service';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-merchant-edit',
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.css']
})
export class MerchantEditComponent implements OnInit {

  storeCategories: any;
  errorMessage: any;
  submitted: boolean;
  addStoreForm: any;
  storeId : any;
  constructor(private _merchantService: MerchantService,
    private locationService: LocationServiceService,
    private _categoryService : CategoryService,
    private formBuilder: FormBuilder,
    private _activatedRoute : ActivatedRoute,
    private _router: Router, ) {
    this.addStoreForm = this.formBuilder.group({
      storeName: ['', Validators.required],
      storeCategoryName: ['', Validators.required],
      storeEmail: ['', Validators.required],
      storePhoneNumber: ['', Validators.required],
      storeAlternateNumber: [''],
      storeLandlineNumber: [''],
      country: [''],
      storeLatitude: ['',Validators.required],
      storeLongitude: ['',Validators.required],
      state: [''],
      city: [''],
      storeGSTNumber: ['', Validators.required],
      storePANNumber: ['', Validators.required],
      storeAddress: ['', Validators.required],
      pinCode: ['', Validators.required],
      storeDescription: ['', Validators.required],
      storeRating: ['', Validators.required],
      status: ['']
    });
  }

  get f() { return this.addStoreForm.controls; }

  ngOnInit() {
    this.storeId = +this._activatedRoute.snapshot.params['storeId'];
    this._categoryService.getAllStoreCategory("").subscribe((data)=>{
      this.storeCategories = data['store_categories'];
    });
    if (this.storeId != 0) {
      this._merchantService.fetchAllStoreById(this.storeId).subscribe((data) => {
        let storedata = data['store'];
        console.log(storedata);
        this.addStoreForm.get('storeAddress').setValue(storedata[0]['address']);
        this.addStoreForm.get('storeAlternateNumber').setValue(storedata[0]['alternative_number']);
        this.addStoreForm.get('storePhoneNumber').setValue(storedata[0]['phone_number']);
        this.addStoreForm.get('storeLandlineNumber').setValue(storedata[0]['landline_number']);
        this.addStoreForm.get('status').setValue(storedata[0]['status']['data'][0]);
        this.addStoreForm.get('country').setValue(storedata[0]['country']);
        this.addStoreForm.get('state').setValue(storedata[0]['state']);
        this.addStoreForm.get('city').setValue(storedata[0]['city']);
        this.addStoreForm.get('storeName').setValue(storedata[0]['store_name']);
        this.addStoreForm.get('storeEmail').setValue(storedata[0]['store_email']);  
        
        this.addStoreForm.get('storeGSTNumber').setValue(storedata[0]['gst_number']);
        this.addStoreForm.get('storePANNumber').setValue(storedata[0]['pan_number']);
        this.addStoreForm.get('pinCode').setValue(storedata[0]['pin_code']);

        this.addStoreForm.get('storeLatitude').setValue(storedata[0]['latitude']);
        this.addStoreForm.get('storeLongitude').setValue(storedata[0]['longitude']);
        this.addStoreForm.get('storeDescription').setValue(storedata[0]['store_description']);
        this.addStoreForm.get('storeRating').setValue(storedata[0]['store_rating']);
        this.addStoreForm.get('storeCategoryName').setValue(storedata[0]['store_parent_category']);
      });
    }
    this.locationService.getPosition().then(pos => {
      // console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.addStoreForm.patchValue({
        storeLatitude: pos.lat, 
        storeLongitude: pos.lng
      });    
    });
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.addStoreForm.invalid) {
      return;
    }
    // console.log(this.storeId);
    if (this.storeId == '') {
      this._merchantService.addNewStore(this.addStoreForm.value).subscribe((data) => {
        console.log(data);
        if (data.status == "200") {
          this._router.navigate(['merchant']);
        }
        if (data.status == "400") {
          alert('Merchant Not Added . Internal Server Error');
        }
      },
        (error) => {
          this.errorMessage = error;
        })
    }
    else {      
      // console.log('Hiiiiiiiiiiiiiiii');
      this._merchantService.editStore(this.addStoreForm.value,this.storeId).subscribe((data) => {
        console.log(data);
        if (data.status == "200") {
          this._router.navigate(['merchant']);
        }
        if (data.status == "400") {
          alert('Merchant Not Added . Internal Server Error');
        }
      },
        (error) => {
          this.errorMessage = error;
        })
    }
   
  }

}
