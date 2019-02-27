import { AppUser } from "./../models/app-user";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { CategoryService } from "../category.service";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent {
  categories$;
  showSpinner: boolean = true;

  appUser: AppUser;
  constructor(
    private auth: AuthService,
    private db: AngularFireDatabase,
    categoryService: CategoryService
  ) {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.categories$ = categoryService.getCategories();
    this.categories$.subscribe(() => {
      this.showSpinner = false;
    });
  }

  logout() {
    this.auth.logout();
  }
}
