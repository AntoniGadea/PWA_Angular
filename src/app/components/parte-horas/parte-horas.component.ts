import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-parte-horas',
  templateUrl: './parte-horas.component.html',
  styleUrls: ['./parte-horas.component.css']
})
export class ParteHorasComponent implements OnInit {
  
  input: any;
  reader: FileReader;
  output: String = "";
  datos: String[];
  texto: string;
  imports: any;
  usuario: Usuario;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.usuario = this.dataService.getLocalData();
    this.imports = this.usuario.registroTrabajo.import;
  }
  
  refresh(){
    this.usuario = this.dataService.getLocalData();
  }

  catchFiles(file: FileList){
    this.input = file[0];
    this.handleFiles();
   }

  handleFiles() {
    this.reader = new FileReader();
    this.reader.addEventListener("loadend",  (e)=>{
      this.texto = this.read(e.target.result);
      this.writeResult();
    });
    this.reader.readAsBinaryString(this.input);
    }
    
    read(result){
      let texto = result;
      console.log(texto);
      if(texto.type == "text/plain")
        return texto;
      
     texto = texto.replace("ï»¿", " ")
     while(texto.includes(";")){
      texto = texto.replace(";"," : ");
     }

     while(texto.includes(" ")){
      texto = texto.replace(" ",'"');
     }

     while(texto.includes("\r")){
      texto = texto.replace("\r",'"');
     }
     while(texto.includes("\n")){
      texto = texto.replace("\n",',"');
     }
     texto = texto.slice(0,texto.length-2);
      return texto;
    }

    writeResult(){
      this.output = this.texto;
      console.log(this.output);
    }

    save(){
      this.texto= '{'+this.output+'}';
      this.dataService.setHoras(JSON.parse(this.texto));
      this.refresh();
    }

}
