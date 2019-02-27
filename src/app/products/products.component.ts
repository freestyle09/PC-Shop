import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  name;
  itemCategories$;
  pcCategories$;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      let name = params.get("name");
      this.name = name;
      this.itemCategories$ = this.categoryService.getCategoriesAll(name);
    })      
  
      // this.pcCategories$ = this.categoryService.getCategoriesPCs();
      
      // let name = this.route.snapshot.paramMap.get('$key');
      // if(name) this.categoryService.getCategoriesName(name).subscribe(c => this.laptopCategories$ = c);
   }

  ngOnInit() {
    
  }

}
