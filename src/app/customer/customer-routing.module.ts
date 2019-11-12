import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerDetailInfoComponent } from './customer-detail/customer-detail-info.component';
import { CustomerAddressesComponent } from './customer-detail/customer-addresses.component';
import { CustomerOrdersComponent } from './customer-detail/customer-orders.component';
import { CustomerCartInfoComponent } from './customer-detail/customer-cart-info.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardComponent
  },
  {
    path: ':customerId',
    component: CustomerDetailComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: CustomerDetailInfoComponent },
      { path: 'customeraddresses', component: CustomerAddressesComponent },
      { path: 'customerorders', component: CustomerOrdersComponent },
      { path: 'customercart', component: CustomerCartInfoComponent }
      //   { path: 'merchantproducts/edit', component: MerchantProductEditComponent },
    ]
  },
  {
    path: ':customerId/edit',
    component: CustomerEditComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomerRoutingModule { }
