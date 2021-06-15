import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Gps } from '../interfaces/gps';
import { Registro } from '../interfaces/registro';
import { Usuario } from '../interfaces/usuario';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { CronService } from './cron.service';
import { Globals } from '../interfaces/globals';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  usuario: Usuario;
  contador:  number = 0;
  registro: Registro = {
    ubicaciones:[],
    horasTrabajadas: 0,
    vacacionesDisponibles: 0,
    vacacionesUsadas: 0,
  };

  constructor(private api: ApiService, private _snackBar: MatSnackBar, private authService: AuthService, private router: Router) { 
    
  }
  
  setLocalData(){
    this.api.getData().subscribe({
      next: data => {
        let d = JSON.stringify(data[0]);
        localStorage.setItem('usuario',d);
        console.log(d);
        localStorage.removeItem('offline');
      },
    error: error =>{
      if(error.status == 401){
        this.mensajeError("La sesion a caducado",true);
        this.authService.logOut();
      }else if(!localStorage.getItem('offline')){
        localStorage.setItem('errorCounter',this.contador.toString())
        this.contador = this.contador+1;
        this.mensajeError("Error de conexion", false);
        if(this.checkCounter()){
          setTimeout(()=>{
            this.setLocalData();
          },10000);
        }
      }

    }}
    )
  }

  checkCounter(): boolean{
    if(this.contador > 3){
      this.mensajeError('Esta en modo offline',false);
      localStorage.setItem('offline','1');
      localStorage.setItem('errorCounter','0');
      return false;
    }
    return true;
  }

  getLocalData():Usuario{
    return JSON.parse(localStorage.getItem('usuario'));
  }

  private saveLocal(usuario: Usuario){
    let data = JSON.stringify(usuario);
    localStorage.setItem('usuario',data);
  }

  private saveApi(usuario:Usuario){
    this.api.saveData(usuario).subscribe({
      next: data => {
        this.successSncakBar('Usuario guardado con exito')
      },
        error: error =>{
          if(error.statusText == 'Unauthorized'){
            this.authService.logOut();
            this.mensajeError('La sesion ha caducado',false);
          }else{
            this.mensajeError('No se ha podido guardar con exito',true)
          }
          
        }
      
    });
  }

  save(usuario: Usuario){
    if(localStorage.getItem('offline')){
      this.mensajeError('Esta en modo sin conexión, solo puede consultar los datos', false)
    }else{
        this.saveApi(usuario);
        this.saveLocal(usuario);
      }
    
  }

  setGps(gps: Gps){
    this.refresh();
    this.usuario.registroTrabajo.ubicaciones.push(gps);
    this.save(this.usuario);
  }

  getGps(): Array<Gps>{
    this.refresh();
    return this.usuario.registroTrabajo.ubicaciones;
  }

  deleteGps(timestamp: number){
    let contador = 0;
    this.getGps();
    this.usuario.registroTrabajo.ubicaciones.forEach((e)=>{
      if(e != null){
        if(e.timestamp == timestamp){
          console.log(contador);
          this.usuario.registroTrabajo.ubicaciones[contador] = null;
        }
        contador++;
      }else{
        contador++;
      }
        
    });
    this.saveLocal(this.usuario);
    this.saveApi(this.usuario);
  }

  getRegistro(): Registro{
    this.refresh();
    return this.usuario.registroTrabajo;
  }
  
  setHoras(datos: any){
    this.refresh();
    let importacion = {
      horas: 0,
      vacaciones: 0
    }
    if(datos.vacacionesDisponibles){
        importacion.vacaciones = datos.vacacionesDisponibles;
    }
    if(datos.horasTrabajadas){
      importacion.horas = datos.horasTrabajadas;
    }
    if(!this.usuario.registroTrabajo.import){
      this.usuario.registroTrabajo.import = [];
    }

    this.usuario.registroTrabajo.import.push(importacion);
    this.saveLocal(this.usuario);
    this.saveApi(this.usuario);
  }

  mensajeError(msg: string, redirect: boolean) {
    if(redirect){
      let sb = this._snackBar.open(msg, 'Ok', {
        duration: 10000,
        panelClass: ["custom-style"]
      });
      sb.onAction().subscribe(() => {
        sb.dismiss();
        this.router.navigate(['/login']);
      });
    }else{
      let sb = this._snackBar.open(msg, 'Ok', {
        duration: 10000,
        panelClass: ["custom-style"]
      });
      sb.onAction().subscribe(() => {
        sb.dismiss();
      });
    }
    
  }

  successSncakBar(msg: string) {
    let sb = this._snackBar.open(msg, '', {
      duration: 4000,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  
  refresh(){
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

}


