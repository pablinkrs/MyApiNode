import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class LlamadaApi{
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  llamadaLogin (user, gethash = null) {
    if(gethash != null){
      user.gethash = gethash;
    }
    let json = JSON.stringify(user);
    let headers = new Headers(
    {
      'Content-Type': 'application/json'
    }
    );
    return this._http.post(this.url+'login',json,{headers: headers}).map(res => res.json());
  }

  getStorage(tipo){
  if(tipo == "identity" && localStorage.getItem('identity') != "undefined"){
    return JSON.parse(localStorage.getItem('identity'));
    }
  if(tipo == "token" && localStorage.getItem('token') != "undefined"){
    return localStorage.getItem('tokenApi');
    }
    return "";
  }
  setStorage(tipo,value){

  if(tipo == "identity"){
    localStorage.setItem('identity', JSON.stringify(value));
    }
  if(tipo == "token"){
    localStorage.setItem('tokenApi', JSON.stringify(value));
    }
  }
  removeStorage(tipo){

  if(tipo == "identity"){
    localStorage.removeItem('identity');
    }
  if(tipo == "token"){
    localStorage.removeItem('tokenApi');
    }
    return "";
  }
}
