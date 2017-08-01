import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { ServiceApp } from './services/serviceApp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ServiceApp]
})
export class AppComponent implements OnInit {
  public title = 'Pablinkfy';
  public user: User;
  public userNew: User;
  public identity;
  public token;

  constructor(private _serviceApp: ServiceApp){
    this.resetForms();
  }
  private resetForms(){
    this.user = new User('','','','','','ROLE_USER','');
    this.userNew = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    this.identity = this._serviceApp.getStorage('identity');
    this.token = this._serviceApp.getStorage('token');
  }

  public login(){
    var res = this._serviceApp.llamadaApi('login',this.user).subscribe(
    response => {
      this.identity = response.user;
      this.token = response.token;
      this._serviceApp.setStorage('identity',this.identity);
      this._serviceApp.setStorage('token',this.token);
      this.resetForms();
    },
    error => {
      var errorMessage = <any>error;

      if(errorMessage != null){
        console.log(error);
      }
    });
  }

  public logout(){
    this.identity = this._serviceApp.removeStorage('identity');
    this.token = this._serviceApp.removeStorage('token');
  }

  public register(){
    console.log(this.userNew);
    var res = this._serviceApp.llamadaApi('createUser',this.userNew).subscribe(
    response => {
      console.log(response.user);
      this.resetForms();
    },
    error => {
      var errorMessage = <any>error;

      if(errorMessage != null){
        console.log(error);
      }
    });
  }
}
