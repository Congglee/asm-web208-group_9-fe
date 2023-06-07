import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteLayoutComponent } from './layouts/website-layout/website-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { ProductsPageComponent } from './pages/client/products-page/products-page.component';
import { ProductDetailPageComponent } from './pages/client/product-detail-page/product-detail-page.component';
import { RegisterPageComponent } from './pages/client/register-page/register-page.component';
import { SigninPageComponent } from './pages/client/signin-page/signin-page.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'products/:id', component: ProductDetailPageComponent },
      { path: 'products/category/:id', component: ProductsPageComponent },
    ],
  },
  { path: 'sign-up', component: RegisterPageComponent },
  { path: 'sign-in', component: SigninPageComponent },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
