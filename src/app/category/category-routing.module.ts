import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ShopperCategoryComponent } from './shopper-category/shopper-category.component';
import { AddStoreCategoryComponent } from './shopper-category/add-store-category.component';
import { StoreCategoryResolver } from './store-category-resolver.service';
import { CategoryResolverService } from './category-resolver.service';

const routes: Routes = [
    {
        path: 'storecategories',
        component: ShopperCategoryComponent,
        resolve:{ storeCategoriesdata: StoreCategoryResolver }
    },
    // {
    //     path: 'storecategories/:id',
    //     component: AddStoreCategoryComponent
    // },
    {
        path: 'storecategories/:storeCategoryId/edit',
        component: AddStoreCategoryComponent
    },
    {
        path: 'storesubcategories/:id',
        component: CategoryListComponent,
        resolve:{storesubcategorydata:CategoryResolverService}
    },
    {
        path: 'storesubcategories/:categoryId/edit',
        component: CategoryAddComponent
    },
    {
        path: '',
        component: CategoryListComponent
    },
    {
        path: ':id',
        component: CategoryDetailComponent
    },
    {
        path: ':id/edit',
        component: CategoryAddComponent
    },
   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule {

}