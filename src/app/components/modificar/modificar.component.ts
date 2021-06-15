import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Errors } from 'src/app/interfaces/error';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { MustMatch } from 'src/app/validators/must-match';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

    
  form: FormGroup;
  loginInvalid = false;
  submit = false;
  usuario: Usuario;
  errores: string;
  error: Errors;
  
  constructor(
    private formBuilder: FormBuilder,
    private registrarionService: DataService,
    public router: Router,
    private _snackBar: MatSnackBar
    ) {

    }

  ngOnInit(): void {

    this.usuario = this.registrarionService.getLocalData();
    this.startForm();

  }
  
  startForm(){
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      empresa: [null, ],
    });
  }
  
  onSubmit(){
    this.submit = true;
    if (this.form.valid) {
      this.registrarionService.save(this.usuario);
      this.router.navigate(['/perfil']);
    }

  }
    
  displayErrors(){
    let errors="";
    if(this.error.email){
      this.error.email.forEach( e =>{
        errors += e+',';
      })
    }
    if(this.error.password1){
      this.error.password1.forEach( e =>{
        errors += e+'\n';
      })
    }
    this.errores = errors;
    this.showBasicComponent();
  }

  showBasicComponent() {
    let sb = this._snackBar.open(this.errores, 'Ok', {
      duration: 10000,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

}
