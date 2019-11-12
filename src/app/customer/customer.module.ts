import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CustomerDetailInfoComponent } from './customer-detail/customer-detail-info.component';
import { CustomerAddressesComponent } from './customer-detail/customer-addresses.component';
import { CustomerOrdersComponent } from './customer-detail/customer-orders.component';
import { CustomerCartInfoComponent } from './customer-detail/customer-cart-info.component';



@NgModule({
  declarations: [CustomerDashboardComponent, CustomerEditComponent, CustomerDetailComponent, CustomerDetailInfoComponent, CustomerAddressesComponent, CustomerOrdersComponent, CustomerCartInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
