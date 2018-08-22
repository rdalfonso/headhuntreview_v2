import { Component, OnInit } from '@angular/core';
import { ICandidate } from './candidate';
import { CandidateService } from './candidate.service';
import { UserService } from './../admin/adminShared/user.service';

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Component({
    templateUrl: './candidate-list.component.html'
})
export class CandidateListComponent implements OnInit {
  IsLoggedin = false;
  _listFilter: string;
  pageTitle: string;
  filteredCandidates: ICandidate[];
  candidates: ICandidate[] = [];

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredCandidates = this.listFilter ? this.performFilter(this.listFilter) : this.candidates;
    }

    constructor(
      private _candidateService: CandidateService,
      private _userService: UserService,
      private _router: Router) { }

    ngOnInit(): void {
        this.IsLoggedin = this._userService.verifyAuth();
        this._candidateService.getCandidates()
          .subscribe(candidates => {
            this.candidates = candidates;
            this.filteredCandidates = this.candidates;
            this.pageTitle = this.filteredCandidates.length + ' Candidates found';
          },
          error => console.log(error));
    }

    performFilter(filterBy: string): ICandidate[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.candidates.filter((Candidate: ICandidate) =>
              Candidate.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onAddCandidate(message: string): void {
      this._router.navigate(['/candidates/add']);
    }
}
