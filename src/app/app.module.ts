import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebsiteLayoutComponent } from './layouts/website-layout/website-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NavigationComponent } from './components/admin/navigation/navigation.component';
import { SideBarComponent } from './components/admin/side-bar/side-bar.component';
import { HeaderComponent } from './components/client/header/header.component';
import { FooterComponent } from './components/client/footer/footer.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { ProductsPageComponent } from './pages/client/products-page/products-page.component';
import { ProductDetailPageComponent } from './pages/client/product-detail-page/product-detail-page.component';
import { RegisterPageComponent } from './pages/client/register-page/register-page.component';
import { LoginPageComponent } from './pages/client/login-page/login-page.component';
import { DashBoardPageComponent } from './pages/admin/dash-board-page/dash-board-page.component';
import { BannerComponent } from './components/client/banner/banner.component';
import { SpecialProductsComponent } from './components/client/special-products/special-products.component';
import { FeaturedProductsComponent } from './components/client/featured-products/featured-products.component';
import { GallerySalesComponent } from './components/client/gallery-sales/gallery-sales.component';
import { NewArrivalsProductsComponent } from './components/client/new-arrivals-products/new-arrivals-products.component';
import { BlogListHomeComponent } from './components/client/blog-list-home/blog-list-home.component';
import { BrandListComponent } from './components/client/brand-list/brand-list.component';
import { ManageProductComponent } from './pages/admin/product/manage-product/manage-product.component';
import { AddProductPageComponent } from './pages/admin/product/add-product-page/add-product-page.component';
import { UpdateProductPageComponent } from './pages/admin/product/update-product-page/update-product-page.component';
import { ProductListAdminComponent } from './components/admin/product-list-admin/product-list-admin.component';
import { AddProductFormComponent } from './components/admin/add-product-form/add-product-form.component';
import { UpdateProductFormComponent } from './components/admin/update-product-form/update-product-form.component';
import { SigninPageComponent } from './pages/client/signin-page/signin-page.component';
import { ManageCategoryComponent } from './pages/admin/category/manage-category/manage-category.component';
import { AddCategoryPageComponent } from './pages/admin/category/add-category-page/add-category-page.component';
import { UpdateCategoryPageComponent } from './pages/admin/category/update-category-page/update-category-page.component';
import { CategoryListAdminComponent } from './components/admin/category-list-admin/category-list-admin.component';
import { AddCategoryFormComponent } from './components/admin/add-category-form/add-category-form.component';
import { UpdateCategoryFormComponent } from './components/admin/update-category-form/update-category-form.component';
import { UpdateUserInfoFormComponent } from './components/client/update-user-info-form/update-user-info-form.component';
import { UpdateUserInfoPageComponent } from './pages/client/update-user-info-page/update-user-info-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WebsiteLayoutComponent,
    AdminLayoutComponent,
    NavigationComponent,
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ProductsPageComponent,
    ProductDetailPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    DashBoardPageComponent,
    BannerComponent,
    SpecialProductsComponent,
    FeaturedProductsComponent,
    GallerySalesComponent,
    NewArrivalsProductsComponent,
    BlogListHomeComponent,
    BrandListComponent,
    ManageProductComponent,
    AddProductPageComponent,
    UpdateProductPageComponent,
    ProductListAdminComponent,
    AddProductFormComponent,
    UpdateProductFormComponent,
    SigninPageComponent,
    ManageCategoryComponent,
    AddCategoryPageComponent,
    UpdateCategoryPageComponent,
    CategoryListAdminComponent,
    AddCategoryFormComponent,
    UpdateCategoryFormComponent,
    UpdateUserInfoFormComponent,
    UpdateUserInfoPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 60000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      toastClass: 'toast',
      titleClass: 'toast-title',
      messageClass: 'toast-message',
    }),
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
