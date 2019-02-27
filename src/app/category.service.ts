import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }
  
  getCategories() {
    return this.db.list('/categories');
  }
  getCategoriesAll(name) {
    return this.db.list('/categories-' + name);
  }
  

}
