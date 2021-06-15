import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginInvalid = false;
  submit = false;
  redirectUrl: string = "/home";
  usuario: Usuario;
  sb: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.authService.isAuth()){
      this.router.navigate(['/home']);
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
      password: [null, Validators.required]
    });
  }

  onSubmit(){
    this.submit = true;
    if (this.form.valid) {
      let password = this.form.get('password').value;
       this.usuario.email = this.form.get('email').value;
       this.usuario.password = password;
       this.authService.login(this.usuario);
    }

  }

  checkError(){
    if(localStorage.getItem('error')){
      this.erroSncakBar();
      localStorage.removeItem('error');
      return true;
    }
    return false;
  }

  erroSncakBar() {
    this.sb = this._snackBar.open('Usuario o contraseña no correctos', 'Ok');
    this.sb.onAction().subscribe(() => {
      console.log("click");
      this.sb.dismiss();
    });
  }

  

}

