import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  recognition =  new webkitSpeechRecognition();
  synth = window.speechSynthesis;
  voices = [];
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords;
  result;

  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      this.result = this.tempWords;

      console.log(this.result);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }

  get() {
    return this.result;
  }
  
  speak(msg: string){
    if (this.synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }

    var utterThis = new SpeechSynthesisUtterance(msg);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = ""
    utterThis.pitch = 1;
    utterThis.rate = 1;
    this.synth.speak(utterThis);
  }
  
}
  

