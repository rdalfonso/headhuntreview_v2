import { Component, OnInit } from '@angular/core';
import { IRecruiter } from './recruiter';
import { RecruiterService } from './recruiter.service';
import { UserService } from './../admin/adminShared/user.service';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Component({
    templateUrl: './recruiter-list.component.html',
    styleUrls: ['./recruiter-list.component.css']
})
export class RecruiterListComponent implements OnInit {
    IsLoggedin = false;
    reviewCount: number;
    _listFilter: string;
    pageTitle: string;
    filteredRecruiters: IRecruiter[];
    recruiters: IRecruiter[] = [];
    alphabets =
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
      'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredRecruiters = this.listFilter ? this.performFilter(this.listFilter) : this.recruiters;
    }

    constructor(
      private _recruiterService: RecruiterService,
      private _userService: UserService,
      private router: Router) {
    }

    ngOnInit(): void {
        this.IsLoggedin = this._userService.verifyAuth();
        this.seeAll();
    }

    seeAll(): void {
      this._recruiterService.getRecruiters()
        .subscribe(recruiters => {
          this.recruiters = recruiters;
          this.filteredRecruiters = this.recruiters;
          this.pageTitle = this.filteredRecruiters.length + ' Recruiters found';
         },
         error => console.log(error));
    }

    onAddRecruiter(): void {
        this.router.navigate(['/recruiters/add/c880f7ce-8f29-4ddb-87a5-f63d608073f7']);
    }

    onAddReview(id: string): void {
      this.router.navigate(['/reviews/add/' + id]);
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
