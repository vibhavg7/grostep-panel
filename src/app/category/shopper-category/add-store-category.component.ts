import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-store-category',
  templateUrl: './add-store-category.component.html',
  styleUrls: ['./add-store-category.component.css']
})
export class AddStoreCategoryComponent implements OnInit {

  storeCategoryId: any;
  addStoreCategoryForm: FormGroup;
  submitted: any;
  errorMessage: any;
  constructor(private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _router: Router,
    private formBuilder: FormBuilder) {
    this.addStoreCategoryForm = this.formBuilder.group({
      storeCategoryName: ['', Validators.required],
      storeCategoryRanking: ['', Validators.required],
      status: ['']
    });
  }

  get f() { return this.addStoreCategoryForm.controls; }

  ngOnInit() {
    this.storeCategoryId = +this._activatedRoute.snapshot.params['storeCategoryId'];
    if (this.storeCategoryId != 0) {
      this._categoryService.getStoreCategoryData(this.storeCategoryId).subscribe((data) => {
        // console.log(data);
        let storecategorydata = data['store_categories'];
        console.log(storecategorydata);
        this.addStoreCategoryForm.get('storeCategoryName').setValue(storecategorydata[0]['store_category_name']);
        this.addStoreCategoryForm.get('storeCategoryRanking').setValue(storecategorydata[0]['store_category_ranking']);
        this.addStoreCategoryForm.get('status').setValue(storecategorydata[0]['status']);
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.addStoreCategoryForm.invalid) {
      return;
    }
    if (this.storeCategoryId == '') {
      this._categoryService.addNewStoreCategory(this.addStoreCategoryForm.value).subscribe((data) => {
        console.log(data);
        if (data.status == "200") {
          this._router.navigate(['category/storecategories']);
        }
        if (data.status == "400") {
          alert('Category Not Added . Internal Server Error');
        }
      },
        (error) => {
          this.errorMessage = error;
        })
    }
    else {
      // this._categoryService.editStoreCategory(this.addStoreCategoryForm.value,this.storeCategoryId);
      this._categoryService.editStoreCategory(this.addStoreCategoryForm.value,this.storeCategoryId).subscribe((data) => {
        console.log(data);
        if (data.status == "200") {
          this._router.navigate(['category/storecategories']);
        }
        if (data.status == "400") {
          alert('Category Not Added . Internal Server Error');
        }
      },
        (error) => {
          this.errorMessage = error;
        })
    }


  }

}
