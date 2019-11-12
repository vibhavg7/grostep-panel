import { Component, OnInit } from '@angular/core';
import { UserSettings } from './user-settings';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor() { }
  posterrorMessage : string = '';
  errorMessage:any;
  postError : boolean = false;
  userSetting : UserSettings = {
    name : '',
    email: true,
    password: 'apple',
    interfacesRadios: 'medium',
    subscription: 'monthly',
    notes: 'good apple',
    date: ''

  }
  ngOnInit() {
  }

  onSubmit(form : NgForm) {
    if(form.valid)
    {
      //service call to save the add product to server
    }
    else
    {
      this.posterrorMessage ="Please fix the above errors to continue";
      //error message to fix the above errors.
    }
  }

}
