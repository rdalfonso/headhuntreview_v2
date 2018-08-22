import { Component, OnInit } from '@angular/core';
import { IRecruiter } from '../../recruiters/recruiter';
import { RecruiterService } from '../../recruiters/recruiter.service';
import { UserService } from './../adminShared/user.service';

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Component({
  templateUrl: './admin.recruiter.component.html'
})
export class AdminRecruiterComponent implements OnInit {
    IsLoggedin = false;
    IsAdmin = false;
    pageTitle = 'Recruiter List';
    reviewCount: number;
    _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredRecruiters = this.listFilter ? this.performFilter(this.listFilter) : this.recruiters;
    }

    filteredRecruiters: IRecruiter[];
    recruiters: IRecruiter[] = [];
    alphabets =
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
      'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    constructor(
      private _recruiterService: RecruiterService,
      private _userService: UserService,
      private _router: Router) {
    }

    ngOnInit(): void {
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
      this._recruiterService.getRecruitersAdmin()
        .subscribe(recruiters => {
            this.recruiters = recruiters;
            this.filteredRecruiters = this.recruiters;
            this.pageTitle = this.filteredRecruiters.length + ' Recruiters found';
          },
          error => console.log(error) );
    }

    onAddRecruiter(): void {
        this._router.navigate(['/recruiters/add/c880f7ce-8f29-4ddb-87a5-f63d608073f7'], { queryParams: { mode: 'admin' } });
    }

    performAlphabetFilter(filterBy: string): any {
      this.filteredRecruiters = this.recruiters.filter((company: IRecruiter) =>
              company.name.charAt(0) === filterBy);
    }

    performFilter(filterBy: string): IRecruiter[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.recruiters.filter((Recruiter: IRecruiter) =>
              Recruiter.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}
