import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Review } from '../models/review.model';
import { IReview } from './review';
import { ReviewService } from './review.service';
import { IRecruiter } from '../recruiters/recruiter';
import { RecruiterService } from '../recruiters/recruiter.service';
import { UserService } from './../admin/adminShared/user.service';

@Component({
  templateUrl: './review-add.component.html'
})
export class ReviewAddComponent implements OnInit {
  IsLoggedin = false;
  review: IReview;
  recruiter: IRecruiter;
  redirect = '/recruiters';
  model = new Review('', '', 0, '', '', 0, 0, 0, 0);

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _reviewService: ReviewService,
    private _recruiterService: RecruiterService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.IsLoggedin = this._userService.verifyAuth();

    const param = this._activatedRoute.snapshot.paramMap.get('id');
    this.model.recruiterId = param;

    this._activatedRoute.queryParams
      .filter(params => params.mode)
      .subscribe(params => {
        this.redirect = '/' + params.mode + this.redirect;
      });

    this._recruiterService.getRecruiter(param).subscribe(
      recruiter => this.recruiter = recruiter,
      error => console.log(error));
  }

  submitForm(form: NgForm) {
    const user = this._userService.getUser();
    if (user) {
      this.model.candidateFbId = user.uid;
      this.model.isTooAggressive = (this.model.isTooAggressive) ? 1 : 0;
      this.model.isDishonestJob = (this.model.isDishonestJob) ? 1 : 0;
      this.model.isPersonalInfo = (this.model.isPersonalInfo) ? 1 : 0;
      this.model.isFakeProfile =  (this.model.isFakeProfile) ? 1 : 0;
      this._reviewService.addReview(this.model)
        .subscribe(
            result => this._router.navigate([this.redirect]),
            error => console.log(error)
      );
    }
  }

  onBack(): void {
    this._router.navigate([this.redirect]);
  }

  ratingComponetClick(clickObj: any): void {
        console.log(`The Item ${clickObj.itemId}
            has been given ${clickObj.rating} stars,
            now is time to update the item with the new rating`);
            this.model.stars = clickObj.rating;
    }
}
