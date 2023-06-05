import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
