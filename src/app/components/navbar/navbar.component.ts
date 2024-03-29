import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
    tittle: string = "";
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe(()=>{
      this.tittle = this.router.url;
      this.tittle = this.tittle.split('/')[1];
      this.tittle = this.tittle.toLocaleUpperCase();
      this.tittle = this.tittle.toString();
    })
  }
  
  check(){
    return this.authService.isAuth();
  }
  
  logout(){
    this.authService.logOut();
  }

}
