import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICompany } from '../../companies/company';
import { CompanyService } from '../../companies/company.service';
import { UserService } from './../adminShared/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './admin.company.detail.component.html'
})
export class AdminCompanyDetailComponent implements OnInit {
  IsLoggedin = false;
  IsAdmin = false;
  company: ICompany;
  mapFinalSource: any;
  routeRedirect = '/admin/companies';

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _companyService: CompanyService,
    private _userService: UserService,
    public _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.IsLoggedin = this._userService.verifyAuth();
    this.IsAdmin = this._userService.verifyUserAdmin();

    if (!this.IsLoggedin || !this.IsAdmin) {
      this._router.navigate(['/']);
    }

    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      this.getCompany(param);
    }
  }

  getCompany(id: string) {
    this._companyService.getCompany(id).subscribe(
      (company) => {
        this.company = company;
        this.mapFinalSource = this.buildMap(company);
      },
      error => console.log(error) );
  }

  onBack(): void {
    this._router.navigate([this.routeRedirect]);
  }

  onDelete(id: string): void {
    this._companyService.deleteCompany(id).subscribe(
      recruiter =>  this._router.navigate([this.routeRedirect]),
      error => console.log(error) );
  }

  onAddRecruiter(id: string): void {
    this._router.navigate(['/recruiters/add/' + id], { queryParams: { mode: 'admin' } });
  }

  onApprove(id: string): void {
    this.company.isapproved = 1;
    this._companyService.editCompany(this.company).subscribe(
      recruiter =>  this._router.navigate([this.routeRedirect]),
      error => console.log(error) );
  }

  buildMap(company: ICompany): string {
    let mapFinalSource: string = environment.apiMapUrl + environment.apiMapKey;
    if (company.name !== undefined) {
      mapFinalSource += "&q=" + company.name;
    }
    if (company.city !== undefined) {
      mapFinalSource += "," + company.city;
    }
    if (company.state !== undefined) {
      mapFinalSource += "+" + company.state;
    }
    return mapFinalSource;
  }
}
