import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { AuthGuard } from './user/auth.guard';
import { WelcomeComponent } from './home/welcome.component';
import { SelectiveStrategyService } from './selective-strategy.service';

const routes: any = [ 
  {path:'welcome',component:WelcomeComponent},
  {
    path:'products',
    canActivate:[AuthGuard],
    data:{ preload:true },
    loadChildren: ()=>
      import('./products/product.module').then(m=>m.ProductModule)
  },
  {
    path:'category',
    canActivate:[AuthGuard],
    data:{ preload:true },
    loadChildren: ()=>
      import('./category/category.module').then(m=>m.CategoryModule)
  },
  {
    path:'merchant',
    canActivate:[AuthGuard],
    data:{ preload:true },
    loadChildren: ()=>
      import('./merchant/merchant.module').then(m=>m.MerchantModule)
  },
  {
    path:'customer',
    canActivate:[AuthGuard],
    data:{ preload:true },
    loadChildren: ()=>
      import('./customer/customer.module').then(m=>m.CustomerModule)
  },
  {
    path:'order',
    canActivate:[AuthGuard],
    data:{ preload:true },
    loadChildren: ()=>
      import('./order/order.module').then(m=>m.OrderModule)
  },
  {path:'',redirectTo:'welcome',pathMatch:'full'},
  {path:'**',redirectTo:'welcome',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:SelectiveStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
