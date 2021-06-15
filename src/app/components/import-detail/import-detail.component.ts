import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-import-detail',
  templateUrl: './import-detail.component.html',
  styleUrls: ['./import-detail.component.css']
})
export class ImportDetailComponent implements OnInit {
  @Input() horas;
  @Input() vacaciones;
  @Input() n;
  imorts: any;
  usuario: Usuario;
  constructor(private dataService: DataService) {
    this.usuario = this.dataService.getLocalData();
  }

  ngOnInit(): void {
    this.imorts = this.usuario.registroTrabajo.import;
  }
  
  delete(){
    this.imorts[this.n-1] = {
      horas: 0,
      vacaciones: 0
    };
    this.usuario.registroTrabajo.import = this.imorts;
    console.log(this.usuario.registroTrabajo.import);
    this.dataService.save(this.usuario);
    this.refresh();
  }
  
  refresh(){
    this.usuario = this.dataService.getLocalData();
    this.imorts = this.usuario.registroTrabajo.import;
  }
}
