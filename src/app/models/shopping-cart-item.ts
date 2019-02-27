import { Product } from "./product";

export class ShoppingCartItem {
  $key: string;
  name: string;
  price: number;
  category: string;
  quantity: number;

  constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
