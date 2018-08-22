import { Component, OnInit } from '@angular/core';
import { ICompany } from '../../companies/company';
import { CompanyService } from '../../companies/company.service';
import { UserService } from './../adminShared/user.service';

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Component({
  templateUrl: './admin.company.component.html'
})
export class AdminCompanyComponent implements OnInit {
  pageTitle: string;
  _listFilter: string;
  IsLoggedin = false;
  IsAdmin = false;
  filteredCompanies: ICompany[];
  companies: ICompany[] = [];
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
    this.IsAdmin = this._userService.verifyUserAdmin();

    if (!this.IsLoggedin || !this.IsAdmin) {
      this._router.navigate(['/']);
    }

    if (this.IsLoggedin && this.IsAdmin) {
      this.seeAll();
    }
  }

  seeAll(): void {
    this._companyService.getCompaniesAdmin()
      .subscribe(companies => {
        this.companies = companies;
        this.filteredCompanies = this.companies;
        this.pageTitle = this.filteredCompanies.length + ' Companies found';
      },
      error => console.log(error) );
  }

  onAddCompany(): void {
    this._router.navigate(['/companies/add'], { queryParams: { mode: 'admin' } });
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

}
