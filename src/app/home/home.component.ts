import { Observable } from "rxjs/Observable";
import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";
import "rxjs/add/operator/take";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products: any[];
  newArray: any[];
  recProducts: any[];

  constructor(private productService: ProductsService) {
    this.productService.getProductsToList().subscribe(products => {
      this.products = products;

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      

      this.newArray = this.products.reverse().slice(0, 4);
      shuffleArray(this.products);
      this.recProducts = this.products.slice(0,4);
      // shuffleArray(this.newArray);
      // console.log(this.products);
    });
  }

  ngOnInit() {}
}
