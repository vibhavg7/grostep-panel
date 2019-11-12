import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryId: any;
  submitted: boolean;
  errorMessage: string;
  url: string;
  addCategoryForm: any;
  storeCategories: any;
  pageTitle: string = "Add Category";
  constructor(private _categoryService: CategoryService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      storeCategoryName: ['', Validators.required],
      categoryRanking: ['', Validators.required],
      status: ['']
    });
  }

  get f() { return this.addCategoryForm.controls; }
  ngOnInit() {
    this.categoryId = +this._activatedRoute.snapshot.params['categoryId'];
    if (this.categoryId != 0) {
      this._categoryService.getSubCategoryData(this.categoryId).subscribe((data) => {
        // console.log(data);
        this.addCategoryForm.get('categoryName').setValue(data[0]['sub_category_name']);
        // // this.addCategoryForm.get('storeCategoryName').setValue(data[0]['store_category_name']);
        this.addCategoryForm.get('storeCategoryName').setValue(data[0]['store_category_id']);
        this.addCategoryForm.get('categoryRanking').setValue(data[0]['ranking']);
        this.addCategoryForm.get('status').setValue(data[0]['status']);
      });
    }
    this._categoryService.storeCategories.subscribe((data)=>{
      console.log(data);
      this.storeCategories = data['store_categories'];
      console.log(this.storeCategories);
    });
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.addCategoryForm.value);
    if (this.addCategoryForm.invalid) {
      return;
    }
    if (this.categoryId == 0) {      
      this._categoryService.addNewStoreSubCategory1(this.addCategoryForm.value).subscribe((data) => {
        console.log(data);
        if (data.status == "200") {
          this._router.navigate(['category/storesubcategories',this.addCategoryForm.value['storeCategoryName']]);
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
      console.log(this.addCategoryForm.value);
      // this._categoryService.editStoreCategory(this.addStoreCategoryForm.value,this.storeCategoryId);
      this._categoryService.editStoreSubCategory(this.addCategoryForm.value, this.categoryId)
      .subscribe((data) => {
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

    // login(addCategoryForm: NgForm) {
    //   if (addCategoryForm && addCategoryForm.valid) {
    //     // const userName = addCategoryForm.form.value.userName;
    //     // const password = addCategoryForm.form.value.password;
    //     // this.authService.login(userName, password);
    //     this.router.navigate(['/category']);
    //     // Navigate to the Product List page after log in.
    //   } else {
    //     this.errorMessage = 'Please enter all the details.';
    //   }
    // }
  }
}
