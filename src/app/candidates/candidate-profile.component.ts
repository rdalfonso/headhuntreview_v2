import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Profile } from './../models/profile.model';
import { ICandidate } from './candidate';
import { CandidateService } from './candidate.service';
import { UserService } from './../admin/adminShared/user.service';

@Component({
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {
  candidate: ICandidate;
  IsLoggedin = false;
  IsAdmin = false;
  IsEditProfileMode = false;
  IsEditPasswordMode = false;
  passwordFail = false;
  model = new Profile('', '',  '', '', '', 0, '', '');

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _candidateService: CandidateService) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    this.IsLoggedin = this._userService.verifyAuth();
    if (this.IsLoggedin && param) {
      this.getProfile(param);
    }
  }

  getProfile(id: string) {
    this._candidateService.getCandidateAuth(id).subscribe(
      candidate => {
        this.candidate = candidate;
        if (candidate) {
          this.model.fireBaseId = id;
          this.model.name = candidate.name;
          this.model.title = candidate.title;
          this.model.email = candidate.email;
          this.model.password1 = '';
          this.model.password2 = '';
        }
      },
      error => console.log(error));
  }

  onEdit(): void {
    this.IsEditProfileMode = true;
  }

  onPasswordEdit(): void {
      this.IsEditPasswordMode = true;
  }

  onCancelProfile(): void {
    this.IsEditProfileMode = false;
  }

  onCancelPassword(): void {
      this.IsEditPasswordMode = false;
  }

  onDelete(id: string): void {
    this._candidateService.deleteCandidate(id).subscribe(
      recruiter =>  this._router.navigate(['/candidates']),
      error => console.log(error));
  }

  submitFormProfile(form: NgForm)  {
    this.IsEditProfileMode = true;

    if (this.candidate.name !== this.model.name.trim()) {
      this._userService.updateProfile(this.model.name);
    }

    if (this.candidate.email !== this.model.email.trim()) {
      this._userService.updateEmail(this.model.name);
    }

    const updateObj = {
      "name": this.model.name,
      "title": this.model.title,
      "email": this.model.email,
      "adminLevel": this.model.adminLevel,
      "fireBaseId": this.model.fireBaseId,
      "uniqueId": this.candidate.uniqueId
    };

    this._candidateService.editCandidate(updateObj).subscribe(
      result => console.log('updated'),
      error => console.log(error));

    this.IsEditProfileMode = false;
  }

  submitFormPassword(form: NgForm)  {
    if (this.model.password1 !== this.model.password2) {
      this.passwordFail = true;
    } else {
      this.passwordFail = false;
      this._userService.updatePassword(this.model.password1);
      this.IsEditPasswordMode = false;

    }
  }

}
