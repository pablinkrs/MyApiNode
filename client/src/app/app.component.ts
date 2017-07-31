import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { LlamadaApi } from './services/llamadaApi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LlamadaApi]
})
export class AppComponent implements OnInit {
  public title = 'Pablinkfy';
  public user: User;
  public identity;
  public token;

  constructor(private _llamadaApi: LlamadaApi){
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    this.identity = this._llamadaApi.getStorage('identity');
    this.token = this._llamadaApi.getStorage('token');
  }

  public login(){
    var res = this._llamadaApi.llamadaLogin(this.user).subscribe(
    response => {
      this.identity = response.user;
      this.token = response.token;
      this._llamadaApi.setStorage('identity',this.identity);
      this._llamadaApi.setStorage('token',this.token);
    },
    error => {
      var errorMessage = <any>error;

      if(errorMessage != null){
        console.log(error);
      }
    });
  }

  public logout(){
    this.identity = this._llamadaApi.removeStorage('identity');
    this.token = this._llamadaApi.removeStorage('token');
  }
}
