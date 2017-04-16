import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles   = require('./login.css');
const template = require('./login.html');

@Component({
  selector: 'login',
  template: template,
  styles: [ styles ]
})
export class Login {
  constructor(public router: Router, private http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();
    let json = JSON.stringify({ username, password });
    let params = 'json=' + json;
    this.http.post('http://localhost:3000/users', params, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          //this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log("Mot de passe ou identifiant inccorect!");
        }
      );
      this.router.navigate(['home']);
  }

  /*signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }*/
}
