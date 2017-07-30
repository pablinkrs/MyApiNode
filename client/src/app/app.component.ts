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
  public identity = false;
  public token;

  constructor(private _llamadaApi: LlamadaApi){
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    var res = this._llamadaApi.llamadaLogin();
    console.log(res);
  }

  public login(){
    console.log(this.user);
  }
}
