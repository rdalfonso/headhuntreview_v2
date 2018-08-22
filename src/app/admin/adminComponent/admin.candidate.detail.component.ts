import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICandidate } from '../../candidates/candidate';
import { CandidateService } from '../../candidates/candidate.service';
import { UserService } from './../adminShared/user.service';


@Component({
  templateUrl: './admin.candidate.detail.component.html'
})
export class AdminCandidateDetailComponent implements OnInit {
  IsLoggedin = false;
  candidate: ICandidate;
  routeRedirect = '/admin/candidates';

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _candidateService: CandidateService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.IsLoggedin = this._userService.verifyAuth();

    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      this.getCandidate(param);
    }
  }

  getCandidate(id: string) {
    this._candidateService.getCandidate(id).subscribe(
      candidate => this.candidate = candidate,
      error => console.log(error));
  }

  onBack(): void {
    this._router.navigate([this.routeRedirect]);
  }

  onDelete(id: string): void {
    this._candidateService.deleteCandidate(id).subscribe(
      recruiter =>  this._router.navigate([this.routeRedirect]),
      error => console.log(error));
  }

  onResetEmail(email: string): void {
    this._userService.sendPasswordEmail(email);
    console.log('email sent');
  }

}
