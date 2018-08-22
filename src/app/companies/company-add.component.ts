import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Company } from '../models/company.model';
import { ICompany } from './company';
import { CompanyService } from './company.service';
import { UserService } from './../admin/adminShared/user.service';

@Component({
  templateUrl: './company-add.component.html'
})
export class CompanyAddComponent implements OnInit {
  IsLoggedin = false;
  company: ICompany;
  redirect = '/companies';
  model = new Company('', '', 'Recruiting', '', '', '', '', '', 0);

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _companyService: CompanyService,
    private _userService: UserService) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
    }
    this.IsLoggedin = this._userService.verifyAuth();

    this._activatedRoute.queryParams
      .filter(params => params.mode)
      .subscribe(params => {
        this.redirect = '/' + params.mode + this.redirect;
      });
  }

  submitForm(form: NgForm) {
    this._companyService.addCompany(this.model)
      .subscribe(
          result => this._router.navigate(['company/add/confirm']),
          error => console.log(error)
    );
  }

  onBack(): void {
    this._router.navigate([this.redirect]);
  }
}
