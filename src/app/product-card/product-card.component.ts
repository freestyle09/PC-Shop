import { Product } from "./../models/product";
import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart";
import { ReviewsService } from "../reviews.service";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit, OnChanges{
  @Input("product") product: Product;
  @Input("shopping-cart") shoppingCart: ShoppingCart;
  review = {};
  reviews = {};
  description: string;
  product$;
  key: any[] = [];
  items: number = 0; // length
  sum: number; // suma ocen
  average = 0;
  rates;

  constructor(
    private cartService: ShoppingCartService,
    private reviewService: ReviewsService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  ngOnChanges() {
    this.getReviewsAndUpdate();
  }

  ngOnInit() {
    this.getReviewsAndUpdate();
  }

  getReviewsAndUpdate() {
    if (this.product.reviews) {
      this.product$ = this.reviewService.getReview(this.product.$key);
      this.key = Object.values(
        this.product.reviews ? this.product.reviews : []
      );
      this.items = this.key.length;
      this.rates = this.key.map(item => item.rate);
      this.sum = this.rates.reduce(this.total);
      this.average = this.averageRating();
    }
  }

  averageRating() {
    return this.sum / this.items;
  }

  private total(total, num) {
    return total + num;
  }
}
