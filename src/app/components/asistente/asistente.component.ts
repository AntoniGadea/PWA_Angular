import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';

@Component({
  selector: 'app-asistente',
  templateUrl: './asistente.component.html',
  styleUrls: ['./asistente.component.css']
})
export class AsistenteComponent implements OnInit {
  resultado: string = " s";

  constructor(private speech: SpeechRecognitionService, private router:Router) {
    this.speech.init();
  
  }
  
  ngOnInit(): void {}
    
  
  listen(){
    this.speech.start();
    setTimeout(()=>{
      this.speech.stop();
      this.resultado = this.speech.get();
      this.go()
    },4000);
    
  }
  
  go(){
    if(this.resultado.includes('GPS') || this.resultado.includes('fichar') || this.resultado.includes('ubicacion') || this.resultado.includes('ubicaciones') ){
      this.router.navigate(['/fichar'])  
      this.speech.speak('Desde aqui podras fichar o consultar tus ultimas ubicaciones');
    }else if(this.resultado.includes('gilipollas')){
        this.speech.speak('Tu puta madre');
    }else if(this.resultado.includes('perfil')){
      this.router.navigate(['/perfil'])  
    }else if(this.resultado.includes('home')){
      this.router.navigate(['/home'])  
    }
  }

}
