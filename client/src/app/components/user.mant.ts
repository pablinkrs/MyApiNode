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
  public mantener;
  public createUser;


  constructor(private _serviceApp: ServiceApp) {}
  ngOnInit() {
    this.titulo = "Usuarios";
    this.identity = this._serviceApp.getStorage("identity");
    this.token = this._serviceApp.getStorage("token");
  }

  public modalUsuario(accion, tipo = "crear",cual = false){
    this.user = cual?this.identity:new User('','','','','','ROLE_USER','');
    this.mantener = accion;
    if(tipo == "crear"){
      this.createUser = true;
    } else {
      this.createUser = false;
    }
  }
  public modalPassword(accion, diferente = false, usr = null){
    this.mantener = accion;
    if(diferente && accion){
      this.user = usr
    } else if(accion) {
      this.user = this.identity;
    }
  }
  public mantendor(accion = false){
    console.log(this.user);
    var ruta = this.createUser ? "createUser":"updateUser";
    ruta = accion? "changePassword":ruta;
    var res = this._serviceApp.llamadaApi(ruta,this.user, true).subscribe(
    response => {
      if(!accion){
        this.modalUsuario(false);
      } else {
        this.modalPassword(false);
      }
    },
    error => {
      var errorMessage = <any>error;

      if(errorMessage != null){
        console.log(error);
      }
    });
  }
}
