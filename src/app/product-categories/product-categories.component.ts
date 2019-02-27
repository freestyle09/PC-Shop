import { Observable } from "rxjs/Observable";
import { Product } from "./../models/product";
import { OnDestroy, Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { DataTableResource } from "angular5-data-table";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
  selector: "app-product-categories",
  templateUrl: "./product-categories.component.html",
  styleUrls: ["./product-categories.component.scss"]
})
export class ProductCategoriesComponent implements OnInit, OnDestroy {
  productCategory: Product[];
  products: Product;
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  name;
  category: Product[];
  items: Product[] = [];
  itemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    this.route.paramMap.subscribe(params => {
      let name = params.get("name");
      this.name = name;
    });
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();

    this.subscription = this.productService.getAll().subscribe(products => {
      this.category = products.filter(
        products => products.category == this.name
      );
    });
  }

  // private InitializeTable(products: Product[]) {
  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({ offset: 0 }).then(items => (this.items = items));
  //   this.tableResource.count().then(count => (this.itemCount = count));
  // }

  // reloadItems(params) {
  //   if (!this.tableResource) return;
  //   this.tableResource.query(params).then(items => (this.items = items));
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
