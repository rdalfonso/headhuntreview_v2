import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CandidateService } from '../../candidates/candidate.service';
import { Candidate } from '../../models/candidate.model';
import { ICandidate } from '../../candidates/candidate';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService implements CanActivate {
    private _apiMapKey  = environment.apiMapKey;
    private _authDomain = environment.firebase.authDomain;
    private _fbDatabaseUrl = environment.firebase.databaseURL;
    private _projectId = environment.firebase.projectId;
    private _storageBucket = environment.firebase.storageBucket;
    private _messagingSenderId = environment.firebase.messagingSenderId;

    public userLoggedin = false;
    public loggedinUser: string;
    public authUser: any;
    public candidate: ICandidate;

    constructor(
      private router: Router,
      private candidateService: CandidateService) {
      firebase.initializeApp({
        apiKey: this._apiMapKey,
        authDomain: this._authDomain,
        databaseURL: this._fbDatabaseUrl,
        projectId: this._projectId,
        storageBucket: this._storageBucket,
        messagingSenderId: this._messagingSenderId
      });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const url: string = state.url;
      return this.verifyLogin(url);
    }

    updateProfile(newDisplayName: string) {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: newDisplayName,
        photoURL: ""
      }).then(function() {
        console.log('profile updated');
      }).catch(function(error) {
        console.log('profile updated error ' + error);
      });
    }

    updatePassword(newPassword: string) {
      const user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(function() {
        console.log('password updated');
      }).catch(function(error) {
        console.log(error);
      });
    }

    updateEmail(newEmail: string) {
      const user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(function() {
        console.log('email updated');
      }).catch(function(error) {
        console.log(error);
      });
    }

    sendPasswordEmail(email: string): void {
      const auth = firebase.auth();
      auth.sendPasswordResetEmail(email).then(function() {
        alert('Your password change email has been sent.');
      }).catch(function(error) {
        console.log(error);
      });
    }

    register(name: string, title: string, email: string, password: string) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((firebaseUser) => {
          alert(`Welcome ${name}`);
          firebaseUser.user.updateProfile({ displayName: name, photoURL: ''})
          .then(function() {  console.log(name + 'updated'); }).catch(function(error) {
            console.log('error update firebase user post reg');
          });

          const candidate = new Candidate(name, title, firebaseUser.user.email, 0, firebaseUser.user.uid);
          this.candidateService.addCandidate(candidate)
            .subscribe(
                result => {
                  this.router.navigate(['/']);
                },
                error => console.log(error)
          );
        })
        .catch(function(error) {
            alert(`${error.message} Please Try Again!`);
        });
      });
    }

    login(email: string, password: string) {
      let welcome = 'Welcome Back ';
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((firebaseUser) => {
            welcome += (firebaseUser.user.displayName) ? firebaseUser.user.displayName : '';
            alert(welcome);
            this.router.navigate(['/']);
          })
          .catch((error) => {
            alert(`${error.message} Please Try Again!`);
          });
      })
      .catch(function(error) {
        console.log(error.code, error.message);
      });
    }

    logout() {
      firebase.auth().signOut().then(function() {
        localStorage.clear();
      }, function(error) {
        alert(`${error.message} Unable to logout. Try again.`);
      });
      this.userLoggedin = false;
    }

    verifyLogin(url: string): boolean {
      if (this.userLoggedin) { return true; }
      this.router.navigate(['/admin/login']);
      return false;
    }

    verifyAuth(): boolean {
      const user = this.getUser();
      return (user !== undefined);
    }

    verifyUserAdmin(): boolean {
      let IsAdmin = false;
      const user = this.getUser();
      if (user) {
        this.candidateService.getCandidateAuth(user.uid).subscribe(
          candidate => {
            IsAdmin = (candidate.adminLevel > 0);
          },
          error => console.log(error));
      }
      return true;
    }

    getUser(): any {
      const userKey = Object.keys(window.sessionStorage).filter(it => it.startsWith('firebase:authUser'))[0];
      const user = userKey ? JSON.parse(sessionStorage.getItem(userKey)) : undefined;
      return user;
    }

    verifyUser() {
      this.authUser = firebase.auth().currentUser;
      if (this.authUser) {
        this.router.navigate(['/']);
      }
    }
}
