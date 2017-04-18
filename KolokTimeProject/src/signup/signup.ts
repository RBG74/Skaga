import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { contentHeaders } from '../common/headers';
import {Http, Headers} from '@angular/http';

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
  selector: 'signup',
  template: template,
  styles: [ styles ]
})
export class Signup {
  constructor(public router: Router, public http: Http) {
  }

  signup(event, username, password) {
    event.preventDefault();
    var body = '/username='+ username +'?password='+ password;
    //let body = JSON.stringify({ username, password });
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost:27017/skaga/users', body, { headers: headers })
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['home']);
        },
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}
