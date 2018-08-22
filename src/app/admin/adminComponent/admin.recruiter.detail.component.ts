import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IRecruiter } from '../../recruiters/recruiter';
import { RecruiterService } from '../../recruiters/recruiter.service';

import { IReview } from '../../reviews/review';
import { ReviewService } from '../../reviews/review.service';

import { UserService } from './../adminShared/user.service';

@Component({
  templateUrl: './admin.recruiter.detail.component.html'
})
export class AdminRecruiterDetailComponent implements OnInit {
  IsLoggedin = false;
  IsAdmin = false;
  recruiter: IRecruiter;
  recruiterReviews: IReview[];
  routeRedirect = '/admin/recruiters';

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _recruiterService: RecruiterService,
    private _reviewService: ReviewService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.setPage();
  }

  setPage(): void {
    this.IsLoggedin = this._userService.verifyAuth();
    this.IsAdmin = this._userService.verifyUserAdmin();

    if (!this.IsLoggedin || !this.IsAdmin) {
      this._router.navigate(['/']);
    }

    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      this.getRecruiter(param);
    }
  }

  getRecruiter(id: string) {
    this._recruiterService.getRecruiter(id).subscribe(
      recruiter => {
        this.recruiter = recruiter;
        this.recruiterReviews = recruiter.reviews;
      },
      error => console.log(error));
  }

  onBack(): void {
    this._router.navigate([this.routeRedirect]);
  }

  onDelete(rec: IRecruiter): void {
    this._reviewService.deleteReviewList(rec.reviews);

    console.log(rec);
    this._recruiterService.deleteRecruiter(rec.uniqueId).subscribe(
      recruiter =>  this._router.navigate([this.routeRedirect]),
      error => console.log(error));
  }

  onDeleteReview(id: string): void {
    this._reviewService.deleteReview(id).subscribe(
      recruiter =>  this.setPage(),
      error => console.log(error));
  }

  onApproveReview(review: IReview): void {
    review.isapproved = 1;
    this._reviewService.editReview(review).subscribe(
      recruiter =>  this.setPage(),
      error => console.log(error));
  }


  onAddReview(id: string): void {
    this._router.navigate(['/reviews/add/' + id], { queryParams: { mode: 'admin' } });
  }

  onApprove(id: string): void {
    const updateObj = {
      "uniqueId": this.recruiter.uniqueId,
      "name": this.recruiter.name,
      "title": this.recruiter.title,
      "linkedIn": this.recruiter.linkedIn,
      "email": this.recruiter.email,
      "level": this.recruiter.level,
      "companyId": this.recruiter.uniqueId,
      "isApproved": 1,
    };

    this._recruiterService.editRecruiter(updateObj).subscribe(
      recruiter =>  this._router.navigate([this.routeRedirect]),
      error => console.log(error));
  }

}
