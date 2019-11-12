import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantDashboardComponent } from './merchant-dashboard.component';
import { MerchantRoutingModule } from './merchant-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { MerchantEditComponent } from './merchant-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MerchantProductsCatalogComponent } from './merchant-detail/merchant-products-catalog.component';
import { MerchantOrdersComponent } from './merchant-detail/merchant-orders.component';
import { MerchantDetailInfoComponent } from './merchant-detail/merchant-detail-info.component';
import { MerchantProductEditComponent } from './merchant-detail/merchant-product-edit.component';
import { MerchantProductComponent } from './merchant-detail/merchant-product.component';
import { MerchantOrderDetailComponent } from './merchant-detail/merchant-order-detail.component';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AddHeaderInterceptor } from './add-header.interceptor';


@NgModule({
  declarations: [MerchantDashboardComponent, MerchantDetailComponent, 
    MerchantEditComponent, MerchantProductsCatalogComponent, MerchantOrdersComponent,
     MerchantDetailInfoComponent, MerchantProductEditComponent, MerchantProductComponent, MerchantOrderDetailComponent   
      ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MerchantRoutingModule,
    SharedModule
  ]
  // providers:[
  //   { provide:HTTP_INTERCEPTORS,useClass:AddHeaderInterceptor,multi:true }
  // ]
})
export class MerchantModule { }
