import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CronService {
  
  delay: number = 10000;
  ids: Array<number>;
  constructor(private dataService: DataService, private apiService: ApiService) { }

  autoRefresh(functiom: any,delay?: number){
    let id;
    if(delay){
     id = window.setInterval( functiom,delay);
     this.ids.push(id);
    }else{
     id = window.setInterval( functiom,this.delay);
     this.ids.push(id);
    }
  }

  kill(id: number){
    this.ids.forEach((e)=>{
        if(e == id){
          window.clearInterval(e);
          e = null;
        } 
    })
  }

  killAll(){
    this.ids.forEach((e)=>{
      window.clearInterval(e);
      e = null;
  })
  this.ids = [];
  }
}
