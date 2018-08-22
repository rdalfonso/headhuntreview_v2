import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecruiter } from './recruiter';
import { RecruiterService } from './recruiter.service';
import { UserService } from './../admin/adminShared/user.service';

@Component({
  templateUrl: './recruiter-detail.component.html'
})
export class RecruiterDetailComponent implements OnInit {
  recruiter: IRecruiter;
  IsLoggedin = false;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _RecruiterService: RecruiterService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.IsLoggedin = this._userService.verifyAuth();
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      this.getRecruiter(param);
    }
  }

  getRecruiter(id: string) {
    this._RecruiterService.getRecruiter(id).subscribe(
      recruiter => this.recruiter = recruiter,
      error => console.log(error));
  }

  onBack(): void {
    this._router.navigate(['/recruiters']);
  }

  onAddReview(id: string): void {
    this._router.navigate(['/reviews/add/' + id]);
  }
}
