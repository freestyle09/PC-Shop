import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { OrderService } from "../order.service";
import { Order } from "../models/order";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.scss"]
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  @Input('cart') cart: ShoppingCart;
  
  userSubscription: Subscription;
  userId: string;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private odrerService: OrderService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
    });
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    // console.log(this.shipping);
    let result = await this.odrerService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }


}
