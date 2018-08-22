import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IReview } from './review';
import { ReviewService } from './review.service';
import { UserService } from './../admin/adminShared/user.service';

@Component({
  templateUrl: './review-detail.component.html'
})
export class ReviewDetailComponent implements OnInit {
  review: IReview;
  IsLoggedin = false;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _reviewService: ReviewService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.IsLoggedin = this._userService.verifyAuth();

    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      this.getReview(param);
    }
  }

  getReview(id: string) {
    this._reviewService.getReview(id).subscribe(
      review => this.review = review,
      error => console.log(error));
  }

  onBack(): void {
    this._router.navigate(['/reviews']);
  }
}
