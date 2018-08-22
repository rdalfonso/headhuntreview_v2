import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICandidate } from './candidate';
import { CandidateService } from './candidate.service';
import { UserService } from './../admin/adminShared/user.service';

@Component({
  templateUrl: './candidate-detail.component.html'
})
export class CandidateDetailComponent implements OnInit {
  candidate: ICandidate;
  IsLoggedin = false;

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
    this._router.navigate(['/candidates']);
  }

  onEditReview(id: string): void {
    this._router.navigate(['/candidates/edit']);
  }

}
