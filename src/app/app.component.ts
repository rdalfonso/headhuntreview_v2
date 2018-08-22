import { Component, OnInit } from '@angular/core';
import { UserService } from './admin/adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor (
    private userSVC: UserService,
    private router: Router ) { }
  userLoggedIn = false;
  userAuthId: string;

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setTimeout(() => {
          const userKey = Object.keys(window.sessionStorage).filter(it => it.startsWith('firebase:authUser'))[0];
          const userStorage = userKey ? JSON.parse(sessionStorage.getItem(userKey)) : undefined;
            if (userStorage) {
              this.userAuthId = userStorage.uid;
            }
         }, 1000);
          this.userLoggedIn = true;
      } else {
          this.userLoggedIn = false;
      }
    });
  }

  onHome() {
    this.router.navigate(['']);
  }

  logout() {
    this.userSVC.logout();
    this.router.navigate(['']);
  }
}
