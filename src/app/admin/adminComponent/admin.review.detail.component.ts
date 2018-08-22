import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IReview } from '../../reviews/review';
import { ReviewService } from '../../reviews/review.service';
import { UserService } from './../adminShared/user.service';

@Component({
  templateUrl: './admin.review.detail.component.html'
})
export class AdminReviewDetailComponent implements OnInit {
  review: IReview;
  IsLoggedin = false;
  IsAdmin = false;
  routeRedirect = '/admin/reviews';

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _reviewService: ReviewService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.IsLoggedin = this._userService.verifyAuth();
    this.IsAdmin = this._userService.verifyUserAdmin();

    if (!this.IsLoggedin || !this.IsAdmin) {
      this._router.navigate(['/']);
    }

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
    this._router.navigate([this.routeRedirect]);
  }

  onDelete(id: string): void {
    this._reviewService.deleteReview(id).subscribe(
      recruiter =>  this._router.navigate([this.routeRedirect]),
      error => console.log(error));
  }

  onApprove(id: string): void {
    this.review.isapproved = 1;
    this._reviewService.editReview(this.review).subscribe(
      recruiter =>  this._router.navigate([this.routeRedirect]),
      error => console.log(error));
  }

}
