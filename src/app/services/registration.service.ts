import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Errors } from '../interfaces/error';
import { Globals } from '../interfaces/globals';
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  apiUrl: string;
  headers = new HttpHeaders;
  global: Globals;
  httpOptions = {
    headers: this.headers
  }
  
  

  constructor(private http: HttpClient, private router: Router,public globals: Globals ) {
    this.global = globals;
    this.apiUrl = "https://"+this.global.ip+"/rest-auth/registration/";
   }
    
  createContentHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
  }

  register(usuario: Usuario): Observable<any>{
    this.createContentHeader(this.headers);
    return this.http.post<string>(this.apiUrl,usuario,this.httpOptions);
  }


}

