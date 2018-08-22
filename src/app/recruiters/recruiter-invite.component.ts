import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Recruiter } from '../models/recruiter.model';
import { RecruiterService } from './recruiter.service';
import { UserService } from './../admin/adminShared/user.service';
import { Observable, Subject } from 'rxjs/';

@Component({
  templateUrl: './recruiter-invite.component.html',
  styleUrls: ['./recruiter-invite.component.css']
})
export class RecruiterInviteComponent implements OnInit {

  IsLoggedin = false;
  redirect = '/recruiters';
  model = new Recruiter('', '', '', '', '', 0, '', '');
  experienceLevels = ['Junior', 'Mid-level', 'Senior'];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _recruiterService: RecruiterService,
    private _userService: UserService) {
  }

  ngOnInit(): void {
    this.IsLoggedin = this._userService.verifyAuth();

    this._activatedRoute.queryParams
      .filter(params => params.mode)
      .subscribe(params => {
        this.redirect = '/' + params.mode + this.redirect;
      });
  }

  nameToUpperCase(value: string) {
     if (value.length > 0) {
       this.model.name = value.charAt(0).toUpperCase() + value.slice(1);
     } else {
       this.model.name = value;
     }
    }

  onBack(): void {
    this._router.navigate([this.redirect]);
  }

  submitForm(form: NgForm) {
    console.log('this.model', this.model)
    this._recruiterService.addRecruiter(this.model)
      .subscribe(
          result => this._router.navigate(['/recruiter/add/confirm']),
          error => console.log(error)
    );
  }
}
