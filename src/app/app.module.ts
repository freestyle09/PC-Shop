import { AdminAuthGuard } from './admin-auth-guard.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { GoTopButtonModule } from 'ng2-go-top-button';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { ProductsService } from './products.service';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ReviewsService } from './reviews.service';
import { ReversePipe } from './reverse.pipe';
import { FloatNumbersPipe } from './floatNumbers.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    ProductCategoriesComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductQuantityComponent,
    ProductReviewsComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ReversePipe,
    FloatNumbersPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DataTableModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    GoTopButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories/:name', component: ProductsComponent },
      { path: 'products/:name', component: ProductCategoriesComponent },
      { path: 'product-details/:name/:id', component: ProductDetailsComponent },

      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductsService,
    ShoppingCartService,
    OrderService,
    ReviewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
