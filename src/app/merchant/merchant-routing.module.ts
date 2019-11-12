import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantDashboardComponent } from './merchant-dashboard.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { MerchantEditComponent } from './merchant-edit.component';
import { MerchantDetailInfoComponent } from './merchant-detail/merchant-detail-info.component';
import { MerchantOrdersComponent } from './merchant-detail/merchant-orders.component';
import { MerchantProductsCatalogComponent } from './merchant-detail/merchant-products-catalog.component';
import { MerchantProductEditComponent } from './merchant-detail/merchant-product-edit.component';
import { MerchantResolverService } from './merchant-resolver.service';
import { MerchantOrderDetailComponent } from './merchant-detail/merchant-order-detail.component';

const routes: Routes = [
    {
        path: '',
        component: MerchantDashboardComponent,
        resolve:{ resolvedMerchants:MerchantResolverService }
    },
    {
        path: ':storeId',
        component: MerchantDetailComponent,
        // canDeactivate: [ProductEditGuard],
        // resolve: { productData: ProductResolverService },
        // , categoryData: CategoryResolverService
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: MerchantDetailInfoComponent },
            { path: 'merchantorders', component: MerchantOrdersComponent },
            { path: 'merchantproducts', component: MerchantProductsCatalogComponent },
            //   { path: 'merchantproducts/edit', component: MerchantProductEditComponent },
        ]
    },
    {
        path: ':storeId/merchantproducts/:productId/edit',
        component: MerchantProductEditComponent
    },
    {
        path: ':storeId/merchantorders/:orderId',
        component: MerchantOrderDetailComponent
    },
    {
        path: ':storeId/edit',
        component: MerchantEditComponent
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
export class MerchantRoutingModule {

}