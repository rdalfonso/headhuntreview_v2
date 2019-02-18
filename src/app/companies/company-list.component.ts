import { Component, OnInit } from '@angular/core';
import { ICompany } from './company';
import { CompanyService } from './company.service';
import { UserService } from './../admin/adminShared/user.service';

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Component({
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  _listFilter: string;
  pageTitle: string;
  IsLoggedin = false;
  companies: ICompany[] = [];
  filteredCompanies: ICompany[];
  alphabets =
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredCompanies = this.listFilter ? this.performFilter(this.listFilter) : this.companies;
  }

  constructor(
    private _companyService: CompanyService,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit() {
    this.IsLoggedin = this._userService.verifyAuth();
    if(this.IsLoggedin) {
      this.seeAll();
    }
  }

  seeAll(): void {
    this._companyService.getCompanies()
      .subscribe(companies => {
        this.companies = companies;
        this.filteredCompanies = this.companies;
        this.pageTitle = this.filteredCompanies.length + ' Recruiting Companies found';
      },
      error => console.log(error) );
  }

  performFilter(filterBy: string): ICompany[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.companies.filter((Company: ICompany) =>
            Company.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performAlphabetFilter(filterBy: string): any {
    this.filteredCompanies = this.companies.filter((company: ICompany) =>
            company.name.charAt(0) === filterBy);
  }

  onAddCompany(): void {
    this._router.navigate(['/companies/add']);
  }

}
