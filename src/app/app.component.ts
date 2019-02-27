import { AngularFireAuth } from "angularfire2/auth";
import { AppUser } from "./models/app-user";
import { AuthService } from "./auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { ProductsService } from "./products.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { Product } from "./models/product";
import { ShoppingCartService } from "./shopping-cart.service";
import { ShoppingCart } from "./models/shopping-cart";
import { CategoryService } from "./category.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
  productCategory: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  cart$: Observable<ShoppingCart>;
  result;
  cart: any;
  appUser: AppUser;
  today: Date = new Date();
  searchValue: string = "";
  user: firebase.User;
  categories$;

  constructor(
    private auth: AuthService,
    router: Router,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private productsService: ProductsService,
    db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService,
    private categoryService: CategoryService
  ) {
    setInterval(() => {
      this.today = new Date();
    }, 1);

    auth.user$.subscribe(user => {
      if (!user) return;

      userService.save(user);
      let returnUrl = localStorage.getItem("returnUrl");
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });

    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.afAuth.authState.subscribe(user => (this.user = user));
    this.subscription = this.productsService.getAll().subscribe(products => {
      this.filteredProducts = this.productCategory = products;
    });
    this.categories$ = categoryService.getCategories();
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.productCategory.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : this.productCategory;
  }

  clearSearch() {
    this.searchValue = null;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // gdyby był MemoryLeaks użyj ngOnDestroy() {}
}
