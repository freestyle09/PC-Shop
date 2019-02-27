import { AngularFireAuth } from "angularfire2/auth";
import { AppUser } from "./../models/app-user";
import { AuthService } from "./../auth.service";
import { Component, OnInit, Input, OnDestroy, OnChanges } from "@angular/core";
import { Product } from "../models/product";
import { ReviewsService } from "../reviews.service";
import { Subscription } from "rxjs/Subscription";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { FirebaseObjectObservable } from "angularfire2/database-deprecated";

@Component({
  selector: "product-reviews",
  templateUrl: "./product-reviews.component.html",
  styleUrls: ["./product-reviews.component.scss"]
})
export class ProductReviewsComponent implements OnInit, OnChanges {
  @Input("product") product: Product;
  user: firebase.User;
  currentRate = 0;
  review = {
    description: '',
    
  };
  reviews = {};
  description: string;
  product$;
  userSubscription: Subscription;
  appUser: AppUser;
  key: any[] = [];
  ratingTotal;
  item;
  items: number = 0; // length
  sum: number; // suma ocen
  average = 0;
  rates;


  constructor(
    config: NgbRatingConfig,
    private auth: AuthService,
    private reviewService: ReviewsService,
    private afAuth: AngularFireAuth
  ) {
    config.max = 5;
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.afAuth.authState.subscribe(user => (this.user = user));
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

  addReview() {
    let review = {
      rate: this.currentRate,
      description: this.review,
      user: this.user.displayName
    };

    this.reviewService.saveReview(this.product.$key, review);

    this.items += 1;
    this.sum = this.currentRate;

    

  }
}
