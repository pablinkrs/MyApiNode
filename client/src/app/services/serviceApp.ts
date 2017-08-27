import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class ServiceApp{
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  llamadaApi (ruta,data, auth = false, formFile = false) {
    let json = JSON.stringify(data);
    let Authorization = auth ? this.getStorage("token") : "";
    let content = "application/json";

    let headers = new Headers(
    {
      'Content-Type': content,
      'Authorization': Authorization
    }
    );
    var rtnPost;
    var form = new FormData();
    console.log(formFile);
    if(formFile){
      content = "multipart/form-data"
      /* content = "application/x-www-form-urlencoded" */
      console.log(data.files);
      for(var i = 0; i<data.files.length; i++){
        console.log(data.files[i]);
        form.append("image", data.files[i]);
      }
      form.append("_id",data.user._id);
      console.log(form);
      rtnPost = this._http.post(this.url+ruta,form,{headers: headers}).map(res => res.json());
    }
    else{
      rtnPost = this._http.post(this.url+ruta,json,{headers: headers}).map(res => res.json());
    }
    return rtnPost;
  }

  getStorage(tipo){
  if(localStorage.getItem(tipo) != "undefined"){
    return JSON.parse(localStorage.getItem(tipo));
    }
    return "";
  }
  setStorage(tipo,value){
    localStorage.setItem(tipo, JSON.stringify(value));
  }
  removeStorage(tipo){
    localStorage.removeItem(tipo);
    return "";
  }
}
