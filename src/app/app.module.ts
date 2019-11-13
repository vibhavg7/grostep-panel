import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConvertToSpaces } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star/star.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { UserModule } from './user/user.module';
// import { CategoryModule } from './category/category.module';
import { ShellComponent } from './home/shell.component';
import { LoginComponent } from './user/login.component';
import { MerchantModule } from './merchant/merchant.module';
import { AddHeaderInterceptor } from './shared/helpers/add-header.interceptor';
import { LogResponseInterceptor } from './shared/helpers/log-response.interceptor';
import { CacheInterceptor } from './shared/cache.interceptor';
import { ImageUploadComponent } from './products/image-upload/image-upload.component';
import { MerchantOrderProductListComponent } from './merchant/merchant-detail/merchant-order-product-list.component';
// import { CustomerModule } from './customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ImageUploadComponent,
    MerchantOrderProductListComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    NgbModule,
    // CategoryModule,
    // MerchantModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ImageUploadComponent,
    MerchantOrderProductListComponent
  ]
})
export class AppModule { }
