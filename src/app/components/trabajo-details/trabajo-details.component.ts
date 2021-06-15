import { Component, OnInit } from '@angular/core';
import { Gps } from 'src/app/interfaces/gps';
import { Registro } from 'src/app/interfaces/registro';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-trabajo-details',
  templateUrl: './trabajo-details.component.html',
  styleUrls: ['./trabajo-details.component.css']
})
export class TrabajoDetailsComponent implements OnInit {
  
  registro: Registro;
  ubicaciones: Array<Gps>;
  total: number = 0;
  trabajadas: number = 0;

  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.registro = this.dataService.getRegistro();
    this.ubicaciones = this.registro.ubicaciones;
  }
  
  importHoras(): number{
    try{
      let horas = 0;
      if(this.registro.import){
        this.registro.import.forEach((i)=>{
          console.log(i);
            if('horas' in  i){
              horas = horas + parseInt(i.horas); 
          }
        });
       }
       return horas;
     }
     catch(e){
      return 0;
     }
  }

  importVacaciones(): number{
    try{
      let vacaciones = 0;
      if(this.registro.import){
        this.registro.import.forEach((i)=>{
          if(!i.vacaiones){
            vacaciones = vacaciones + parseInt(i.vacaciones);
          }
         
        });
      }
      return vacaciones;
    }catch(e){
      return 0;
    }
  }

  calcTime(){
    let hours = [];
    let i = 0;
    let par = 0;
    let impar = 0;

    if(!(this.ubicaciones.length <= 1)){
      this.ubicaciones.forEach((u)=>{
        if(u != null){
          if(i%2 == 0){
            par = u.timestamp;
          }else{
            impar = u.timestamp;
          }
          
          if(par>0 && impar>0){
            let date1 = new Date(par);
            let date2 = new Date(impar);
            let h1;
            let h2;

            h1 = date1.getHours();
            h2 = date2.getHours();
            hours.push(h2-h1);
            par = 0;
            impar = 0;
          }
          i++;
      }
      });
    
    hours.forEach((n)=>{
      this.total = this.total+n;
    })
    this.total = this.total + this.importHoras();
    this.trabajadas = this.registro.horasTrabajadas;

    if(typeof(this.trabajadas) == 'string'){
      this.trabajadas = parseInt(this.trabajadas);
    }
  console.log(this.importHoras());
    this.registro.horasTrabajadas = this.total;
    this.registro.vacacionesDisponibles = ((hours.length/30)*2.5)+this.importVacaciones();
    let usuario = this.dataService.getLocalData();
    usuario.registroTrabajo = this.registro;
    this.dataService.save(usuario);
    
    this.total = 0;
    }
  }

}
