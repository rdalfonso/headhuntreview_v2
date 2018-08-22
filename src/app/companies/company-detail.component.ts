import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany } from './company';
import { CompanyService } from './company.service';
import { UserService } from './../admin/adminShared/user.service';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {
  company: ICompany;
  mapFinalSource: any;
  IsLoggedin = false;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _companyService: CompanyService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.IsLoggedin = this._userService.verifyAuth();
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
    this._router.navigate(['/companies']);
  }

  onAddRecruiter(id: string): void {
      this._router.navigate(['/recruiters/add/' + id]);
  }

  onAddReview(id: string): void {
      this._router.navigate(['/reviews/add/' + id]);
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
