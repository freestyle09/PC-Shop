import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database-deprecated";


@Injectable()
export class ProductsService {
  constructor(private db: AngularFireDatabase) {}

  getItem(id) {
    return this.db.object("/products/" + id);
  }

  getAll() {
    return this.db.list("/products/");
  }

  getProductsToList() {
    return this.db.list("/products");
  }
}
