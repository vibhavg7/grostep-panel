import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpaces } from '../shared/convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductParameterService } from './product-parameter.service';
import { ProductShellListComponent } from './product-shell/product-shell-list.component';
import { ProductShellDetailComponent } from './product-shell/product-shell-detail.component';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductShellSearchComponent } from './product-shell/product-shell-search.component';
import { ProductShellAddComponent } from './product-shell/product-shell-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload/image-upload.component';
// import { ProductService } from './product.service';



@NgModule({
  declarations: [
    ProductDetailComponent,
    ConvertToSpaces,
    AddProductComponent,
    ProductShellListComponent,
    ProductShellDetailComponent,
    ProductShellComponent,
    ProductShellSearchComponent,    
    ProductShellAddComponent,
    // ImageUploadComponent
  ],
  imports: [
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[
    ProductParameterService,
    // ProductService
  ]
})
export class ProductModule { }
