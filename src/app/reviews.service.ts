import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database-deprecated";

@Injectable()
export class ReviewsService {
  constructor(private db: AngularFireDatabase) {}

  saveReview(id, review) {
    return this.db.list("/products/" + id + '/reviews/').push(review);
  }

  getReview(id) {
    return this.db.list("/products/" + id + '/reviews/');
  }




}
