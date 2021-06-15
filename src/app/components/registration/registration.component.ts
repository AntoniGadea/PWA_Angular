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
import { SnackBarErrorComponent } from '../snack-bar-error/snack-bar-error.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  form: FormGroup;
  loginInvalid = false;
  submit = false;
  usuario: Usuario;
  errores: string;
  error: Errors;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private registrarionService: RegistrationService,
    private dataService: DataService,
    public router: Router,
    private _snackBar: MatSnackBar
    ) {

    }

  ngOnInit(): void {
    if(this.authService.isAuth()){
      this.router.navigate(['home']);
    }
    this.usuario = {
      email: "",
      password: ""
    }
    this.startForm();

  }
  
  startForm(){
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      password1: [null, Validators.required],
      password2: [null, Validators.required]
    },{
      validator: MustMatch('password1','password2') 
    });
  }
  
  onSubmit(){
    this.submit = true;
    if (this.form.valid) {
      console.log('Denntro');
      this.usuario.email = this.form.get('email').value;
      this.usuario.nombre = this.form.get('first_name').value;
      this.usuario.apellidos = this.form.get('last_name').value;
      this.usuario.password1 = this.form.get('password1').value;
      this.usuario.password2 = this.form.get('password1').value;
      this.registrarionService.register(this.usuario).subscribe({
        next: data => {
          localStorage.removeItem('errors');
          this.dataService.save(this.usuario);
          this.router.navigate(['login']);
        },
        error: error => {
         this.error = error.error;
         this.displayErrors();
        }
      });
      this.form.reset();
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
