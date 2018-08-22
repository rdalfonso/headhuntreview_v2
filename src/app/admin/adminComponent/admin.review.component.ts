import { Component, OnInit } from '@angular/core';
import { IReview } from '../../reviews/review';
import { ReviewService } from '../../reviews/review.service';
import { UserService } from './../adminShared/user.service';

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Component({
    templateUrl: './admin.review.component.html'
})
export class AdminReviewComponent implements OnInit {
    pageTitle: string;
    errorMessage: string;
    _listFilter: string;
    filteredReviews: IReview[];
    reviews: IReview[] = [];
    IsLoggedin = false;
    IsAdmin = false;

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredReviews = this.listFilter ? this.performFilter(this.listFilter) : this.reviews;
    }

    constructor(
      private _reviewService: ReviewService,
      private _userService: UserService,
      private _router: Router) {
    }

    ngOnInit(): void {
      this.IsLoggedin = this._userService.verifyAuth();
      this.IsAdmin = this._userService.verifyUserAdmin();

      if (!this.IsLoggedin || !this.IsAdmin) {
        this._router.navigate(['/']);
      }

      if (this.IsLoggedin && this.IsAdmin) {
        this.seeAll();
      }
    }

    seeAll(): void {
      this._reviewService.getReviewsAdmin()
        .subscribe(reviews => {
            this.reviews = reviews;
            this.filteredReviews = this.reviews;
            this.pageTitle = this.filteredReviews.length + ' Reviews found: ';
        },
        error => console.log(error) );
    }

    performFilter(filterBy: string): IReview[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.reviews.filter((review: IReview) =>
        review.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}
