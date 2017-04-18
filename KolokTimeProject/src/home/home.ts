import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
const styles = require('./home.css');
const template = require('./home.html');

@Component({
  selector: 'home',
  template: template,
  styles: [ styles ]
})
export class Home {
  constructor(public router: Router, private http: Http) {
  }

  urlGif = 'https://media.giphy.com/media/wpVM8uZMwThC0/giphy.gif';
  user: any = { name: 'Jonathan'}
  victimes =""
  getVictime() {
    // A completer
    this.victimes = JSON.stringify(this.http.get('http://localhost:3000/skaga/alhcoholics/aotd').map(res => res.json()));

    //="Fatia";
  }


}
