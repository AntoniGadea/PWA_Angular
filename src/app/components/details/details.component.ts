import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private router: Router) { }
  usuario: Usuario;
  display: boolean = false;

  ngOnInit(): void {
    let data = localStorage.getItem('usuario');
    this.usuario = JSON.parse(data);
    console.log(this.usuario);
  }
  
  show(){
    this.display = !this.display;
  }

  editar(){
    this.router.navigate(['modificar']);
  }
}
