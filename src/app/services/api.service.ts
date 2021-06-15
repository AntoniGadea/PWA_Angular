import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Globals } from '../interfaces/globals';
import { Gps } from '../interfaces/gps';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  httpOptions = {
    headers: this.createHeaders()      
  };

  EMAIL: string = localStorage.getItem('email');
  apiUrl: string;
  apiUpdate: string;
  access: string = localStorage.getItem('token');
  refresh: string;
  global: Globals;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private globals: Globals) {
    this.global = globals;
    this.apiUrl = "https://"+this.global.ip+"/api/usuario/search?search="+this.EMAIL;
    this.apiUpdate = "https://"+this.global.ip+"/api/usuario/update/"+this.EMAIL;
   }
  
  
  createHeaders(): HttpHeaders{
    this.refreshToken();
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'Bearer ' + this.access });
  }

  getData(): Observable<Usuario>{
    this.httpOptions = {
      headers: this.createHeaders()      
    };
    return this.http.get<Usuario>(this.apiUrl,this.httpOptions);
  }

  saveData(usuario: Usuario): Observable<Usuario>{
    this.httpOptions = {
      headers: this.createHeaders()      
    };
    return this.http.put<Usuario>(this.apiUpdate,usuario,this.httpOptions);
  }

  mensajeError(msg: string) {
    let sb = this._snackBar.open(msg, 'Ok', {
      duration: 10000,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  refreshToken(){
    this.access = localStorage.getItem('token');
  }
 
  
}


