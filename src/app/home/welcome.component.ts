import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(
    private router: Router) {
  }


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
