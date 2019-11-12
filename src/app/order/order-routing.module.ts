import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderProductInfoComponent } from './order-management/order-product-info.component';
import { OrderCustomerInfoComponent } from './order-management/order-customer-info.component';
import { OrderMerchantInfoComponent } from './order-management/order-merchant-info.component';
import { OrderDeliveryInfoComponent } from './order-management/order-delivery-info.component';
import { OrderInvoiceInfoComponent } from './order-management/order-invoice-info.component';
import { OrderDashboardComponent } from './order-management/order-dashboard.component';
import { OrderProductsResolver } from './order-products.resolver';

const routes: Routes = [
    {
        path: ':orderId',
        component: OrderDashboardComponent,
        children: [
            { path: 'productsinfo', component: OrderProductInfoComponent,resolve:{resolvedProducts:OrderProductsResolver} },
            { path: 'customerinfo', component: OrderCustomerInfoComponent },
            { path: 'merchantinfo', component: OrderMerchantInfoComponent },
            { path: 'deliveryinfo', component: OrderDeliveryInfoComponent },
            { path: 'invoiceinfo', component: OrderInvoiceInfoComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class OrderRoutingModule {

}