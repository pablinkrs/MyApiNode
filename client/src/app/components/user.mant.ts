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
  public mantenerImagen;
  public createUser;
  public fileToUpload;


  constructor(private _serviceApp: ServiceApp) {}
  ngOnInit() {
    this.titulo = "Usuarios";
    this.identity = this._serviceApp.getStorage("identity");
    this.token = this._serviceApp.getStorage("token");
  }

  public modalUsuario(accion, tipo = "crear",cual = false){
    this.user = cual?this.identity:new User('','','','','','ROLE_USER','');
    this.mantener = accion;
    if(tipo == "crear" && accion){
      this.createUser = true;
    } else if(accion) {
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
  public modalImagen(accion, diferente = false, usr = null){
    this.mantenerImagen = accion;
    if(diferente && accion){
      this.user = usr
    } else if(accion) {
      this.user = this.identity;
    }
  }
  public mantendor(accion = false){
    var ruta = this.createUser ? "createUser":"updateUser";
    ruta = accion? "changePassword":ruta;
    var res = this._serviceApp.llamadaApi(ruta,this.user, true).subscribe(
    response => {
      if(!accion){
        if(!this.createUser && this.identity._id == this.user._id){
          this._serviceApp.setStorage("identity", JSON.stringify(this.user));
          this.identity = this.user;
          document.getElementById("identityApp").innerHTML = this.identity.name;
        }
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
  public changeFile(fileInput: any){
    this.fileToUpload = <Array<File>>fileInput;
  }
  public mantendorImagen(){
    var ruta = "uploadAvatar";

    var res = this._serviceApp.llamadaApi(ruta,{user: this.user, files: this.fileToUpload}, true, true).subscribe(
    response => {
      if(this.identity._id == this.user._id){
        this._serviceApp.setStorage("identity", JSON.stringify(this.user));
        this.identity = this.user;
        document.getElementById("identityApp").innerHTML = this.identity.name;
      }
      this.modalUsuario(false);
    },
    error => {
      var errorMessage = <any>error;

      if(errorMessage != null){
        console.log(error);
      }
    });
  }
}
