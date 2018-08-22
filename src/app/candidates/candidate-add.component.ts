import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Candidate } from '../models/candidate.model';
import { ICandidate } from './candidate';
import { CandidateService } from './candidate.service';
import { UserService } from './../admin/adminShared/user.service';

@Component({
  templateUrl: './candidate-add.component.html'
})
export class CandidateAddComponent implements OnInit {
  IsLoggedin = false;
  candidate: ICandidate;
  redirect = '/candidates';
  model = new Candidate('', '', '', 0, '');

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _candidateService: CandidateService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.IsLoggedin = this._userService.verifyAuth();

    this._activatedRoute.queryParams
      .filter(params => params.mode)
      .subscribe(params => {
        this.redirect = '/' + params.mode + this.redirect;
      });
  }

  submitForm(form: NgForm) {
    this._candidateService.addCandidate(this.model)
      .subscribe(
          result => this._router.navigate([this.redirect]),
          error => console.log(error)
    );
  }

}
