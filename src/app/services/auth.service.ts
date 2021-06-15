import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Globals } from '../interfaces/globals';
import { Token } from '../interfaces/token';
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  globals: Globals;
  apiUrl: string;
  
  constructor(private http: HttpClient, public router: Router, private _snackBar: MatSnackBar, globals: Globals,) {
    this.globals = globals;
    this.apiUrl= "https://"+this.globals.ip+"/api/token/";
    console.log(this.apiUrl);
   }

  checkCredentials(usuario: Usuario): Observable<Token>{
    return this.http.post<Token>(this.apiUrl,usuario,this.httpOptions);
  }

  isAuth(): boolean{
    return (localStorage.getItem('token') != undefined && localStorage.getItem('token').length > 2 );
  }

  logOut(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('offline');
    localStorage.removeItem('usuario');
    this.router.navigate[('/login')];

  }

  login(usuario: Usuario){
    localStorage.setItem('email',usuario.email);
    this.checkCredentials(usuario).subscribe({
      next: data => {
        console.log(data);
        localStorage.setItem('token',data.access);
        localStorage.removeItem('error');
        this.router.navigate(['/home']);
        this.successSncakBar();
      },
      error: error => {
        localStorage.setItem('error','1');
      }
    })
  }

  successSncakBar() {
    let sb = this._snackBar.open('Login correcto, Bienvenido!', '', {
      duration: 4000,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  
}
