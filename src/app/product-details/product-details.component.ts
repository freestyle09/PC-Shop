import { ProductsService } from "./../products.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import "rxjs/add/operator/take";
import { Subscription } from "rxjs/Subscription";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscription2: Subscription;
  cart: any;
  productId$;

  name;
  id;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: ShoppingCartService
  ) {
    this.route.paramMap.subscribe(params => {
      this.name = params.get("name");
      // console.log(name);

      this.id = params.get("id");
      // console.log(id);
      this.productId$ = this.productService.getItem(this.id);
    });
  }

  async ngOnInit() {
    window.scrollTo(0,200);
    this.subscription2 = (await this.cartService.getCart()).subscribe(
      cart => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscription2.unsubscribe();
  }
}
