import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Component } from '@angular/core';

@Component({
  templateUrl: './about.component.html'
})
export class AboutComponent {
  pageTitle: string;

  constructor(private router: Router) { }

  signup() {
    this.router.navigate(['/admin/signup']);
  }

  login() {
    this.router.navigate(['/admin/login']);
  }

  share() {
    this.router.navigate(['/admin/login']);
  }
}
