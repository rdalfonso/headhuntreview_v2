import { Component, OnInit } from '@angular/core';
import { IReview } from './review';
import { ReviewService } from './review.service';
import { UserService } from './../admin/adminShared/user.service';

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Component({
    templateUrl: './review-list.component.html'
})
export class ReviewListComponent implements OnInit {
    _listFilter: string;
    pageTitle: string;
    filteredReviews: IReview[];
    reviews: IReview[] = [];
    IsLoggedin = false;

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
      private _router: Router) { }

    ngOnInit(): void {
      this.IsLoggedin = this._userService.verifyAuth();
      this._reviewService.getReviews()
        .subscribe(reviews => {
            this.reviews = reviews;
            this.filteredReviews = this.reviews;
            this.pageTitle = this.filteredReviews.length + ' Reviews found';
        },
        error => console.log(error) );
    }

    performFilter(filterBy: string): IReview[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.reviews.filter((review: IReview) =>
        review.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}
