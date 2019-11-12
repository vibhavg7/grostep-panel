import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderInfoComponent } from './order-management/order-info.component';
import { OrderCustomerInfoComponent } from './order-management/order-customer-info.component';
import { OrderMerchantInfoComponent } from './order-management/order-merchant-info.component';
import { OrderProductInfoComponent } from './order-management/order-product-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrderDeliveryInfoComponent } from './order-management/order-delivery-info.component';
import { OrderInvoiceInfoComponent } from './order-management/order-invoice-info.component';
import { OrderDashboardComponent } from './order-management/order-dashboard.component';


@NgModule({
  declarations: [
    OrderInfoComponent,
    OrderCustomerInfoComponent,
    OrderDeliveryInfoComponent,
    OrderInvoiceInfoComponent,
    OrderMerchantInfoComponent,
    OrderProductInfoComponent,
    OrderDashboardComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class OrderModule { }
