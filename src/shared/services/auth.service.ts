import {Injectable, Inject} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

import {Router} from '@angular/router'

import {ApiUrl} from '../constants/apiUrl';

import { CookieService } from 'ngx-cookie';

interface Auth{
  username:string,
  password:string
}

@Injectable()

export class AuthService {
  private loginUrl = ApiUrl.API_URL + "authenticate";
  private loggedIn = false;
  redirectUrl: string;

  constructor(private http:Http, private _cookieService:CookieService, private router:Router){
    this.loggedIn = !!this._cookieService.getObject('globals');
  }

  // signup(formData:Auth):Observable<Response>{
  //   return this.http.post(
  //     `${this.config.BASE_URL}/api/v1/auth/signup`,
  //     JSON.stringify(formData),
  //     {headers:new Headers({'Content-Type':'application/json','sb-app-id':this.config.APP_ID,'sb-app-secret':this.config.APP_SECRET})})
  // }

  signup(formData:Auth): any {

  }

  //REAL LOGIN SERVICE
  realLogin(formData:Auth): any {
    return this.http.post(
      this.loginUrl,
      JSON.stringify(formData),
      {headers:new Headers({'Content-Type':'application/json'})}
    )
  }

  //MOCK LOGIN SERVICE (Currently active, cause there is no back-end service)
  login(formData:Auth): any {
    let username = formData.username;
    let password = formData.password;

    let response = { success: username === 'admin' && password === 'ensolar', message: "" };
      if (!response.success) {
        response.message = 'Username o password errati.';
        this.loggedIn = true;
      }

    return Observable.of(response).delay(1000);
  }

  setCredentials(formData:Auth): any {
    let username = formData.username;
    let password = formData.password;

    //Encoded with Base64 through btoa function
    let authdata = btoa(username + ':' + password);

    let globals = {
      currentUser: {
        username: username,
        authdata: authdata
      }
    };

    this._cookieService.putObject('globals', globals);
  }

  clearCredentials = function () {
    let globals = {};
    this._cookieService.remove('globals');
  };

  logout() {
    this.clearCredentials();
    this.loggedIn = false;
    this.router.navigate(['/login'])
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}


