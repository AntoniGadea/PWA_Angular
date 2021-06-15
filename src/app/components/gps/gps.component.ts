import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gps } from 'src/app/interfaces/gps';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {
  
  gps: Gps;
  ubicaciones: Array<Gps>;

  constructor(private _snackBar: MatSnackBar, private dataService: DataService) {
    this.gps = {
      coords: {
        latitude: 0,
        longitude: 0
      },
      timestamp: 0,
    }
    
  }
  
  ngOnInit(): void {
    this.ubicaciones = this.dataService.getGps();
  }
  
  getCurrentLocation(){
    navigator.geolocation.getCurrentPosition((p)=>{
      this.gps.coords.latitude = p.coords.latitude;
      this.gps.coords.longitude = p.coords.longitude;
      this.gps.timestamp = p.timestamp;
      this.gps.date = new Date();
      this.gps.date.getDate();
      this.dataService.setGps(this.gps);
      this.refresh();
    });
  }

  successSncakBar() {
    let sb = this._snackBar.open('Ubicación guardada!', '', {
      duration: 4000,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  
  refresh(){
    this.ubicaciones = this.dataService.getGps();
  }
  
  delete(gps: any){
    this.dataService.deleteGps(gps.timestamp);
    this.refresh();
  }
  

}
