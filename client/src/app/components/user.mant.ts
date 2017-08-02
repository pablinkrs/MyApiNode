import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ServiceApp } from '../services/serviceApp';

@Component({
  selector: 'user-mant',
  templateUrl: '../views/user.mant.html',
  providers: [ServiceApp]
})
export class UserMant implements OnInit {
  public titulo: string;
  public user: User;
  public token;
  public identity;


  constructor(private _serviceApp: ServiceApp) {}
  ngOnInit() {
    this.titulo = "hola k ace";
    this.identity = this._serviceApp.getStorage("identity");
    this.token = this._serviceApp.getStorage("token");
  }
}
