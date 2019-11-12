import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        // canActivate:[AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuard]
    },
    // {path:'products/add',component:AddProductComponent},
    // {path:'products/:id',canActivate:[ProductDetailGuard],component:ProductDetailComponent},
    // {path:'products/:id/edit',component:ProductDetailComponent},

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {

}